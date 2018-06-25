import { Injectable } from '@angular/core';
import { FakeDataService } from './fake-data.service';
import {
  Transaction,
  TransactionItem,
} from '../redux/models/transaction.model';
import { UserStats } from '../redux/models/user.model';
import { Observable, of } from 'rxjs';
import { U } from '../common/common';
import { map, switchMap, tap, delay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ITransactionService } from '../services/transaction.service';

const TRAN_KEY = 'TRANSACTIONS';
const USER_STATS_KEY = 'USER_STATS';
const DELAY = 500;

@Injectable()
export class FakeTransactionService implements ITransactionService {
  constructor(
    private data: FakeDataService,
    private userService: UserService
  ) {}

  add(transaction: Transaction, userSecret: string): Observable<null> {
    return of(null).pipe(
      delay(DELAY),
      switchMap(() => this.userService.getUser(transaction.purchaserUserId)),
      tap(user => {
        // Not worrying aobut security now or ever.
        // const user = this.userService.verifyUser(
        //   transaction.addedByUserId,
        //   userSecret
        // );

        if (!user) {
          throw new Error('Invalid username or secret');
        }

        if (user.teamId !== transaction.teamId) {
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
            let userStats = this.data.getFromArray<UserStats>(
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

            this.data.replaceInArray<UserStats>(
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

  getUserStatsForTeam(teamId: string): Observable<UserStats[]> {
    return of(null).pipe(
      delay(DELAY),
      switchMap(() => {
        return of(
          this.data.getFromArray<UserStats>(
            USER_STATS_KEY,
            item => item.teamId === teamId
          )
        );
      })
    );
  }
}
