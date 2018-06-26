import { Injectable } from '@angular/core';
import { FakeDataService } from './fake-data.service';
import { Observable, of } from 'rxjs';
import { U } from '../common/common';
import { map, switchMap, tap, delay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ITransactionService } from '../services/transaction.service';
import { UserModels } from '../redux/models/user.model';
import { TransactionModels } from '../redux/models/transaction.model';

const TRAN_KEY = 'TRANSACTIONS';
const USER_STATS_KEY = 'USER_STATS';
const DELAY = 500;

@Injectable()
export class FakeTransactionService implements ITransactionService {
  constructor(
    private data: FakeDataService,
    private userService: UserService
  ) {}

  add(
    transaction: TransactionModels.Transaction,
    userSecret: string
  ): Observable<null> {
    return of(null).pipe(
      delay(DELAY),
      switchMap(() =>
        this.userService.verifyUser(transaction.addedByUserId, userSecret)
      ),
      tap(verifiedUser => {
        if (!verifiedUser) {
          throw new Error('Invalid username or secret');
        }
      }),
      switchMap(() => this.userService.getUser(transaction.purchaserUserId)),
      tap(purchaser => {
        // Not worrying aobut security now or ever.

        if (!purchaser) {
          throw new Error('purchaser user id does not exist');
        }

        if (purchaser.teamId !== transaction.teamId) {
          throw new Error('User does not belong to this team');
        }
      }),
      switchMap(user => {
        return this.userService.getUsersForTeam(transaction.teamId);
      }),
      tap(users => {
        users
          .filter(
            u =>
              transaction.purchaserUserId === u.id ||
              transaction.items.some(item => item.userId === u.id)
          )
          .forEach(user => {
            console.log('proc user', user);
            let userStats = this.data.getFromArray<UserModels.UserStats>(
              USER_STATS_KEY,
              item => item.id === user.id
            )[0];

            if (!userStats) {
              userStats = {
                id: user.id,
                purchased: 0,
                consumed: 0,
                teamId: transaction.teamId,
              };
            }
            if (userStats.id === transaction.purchaserUserId) {
              userStats.purchased += transaction.items.reduce(
                (prev, curr) => prev + curr.qty,
                0
              );
            }

            userStats.consumed += transaction.items
              .filter(item => item.userId === userStats.id)
              .reduce((prev, curr) => prev + curr.qty, 0);

            this.data.replaceInArray<UserModels.UserStats>(
              USER_STATS_KEY,
              userStats,
              u => userStats.id === u.id
            );
          });

        this.data.addToArray(TRAN_KEY, transaction);
      }),
      map(() => null)
    );
  }

  getUserStatsForTeam(teamId: string): Observable<UserModels.UserStats[]> {
    return of(null).pipe(
      delay(DELAY),
      switchMap(() => {
        return of(
          this.data.getFromArray<UserModels.UserStats>(
            USER_STATS_KEY,
            item => item.teamId === teamId
          )
        );
      })
    );
  }
}
