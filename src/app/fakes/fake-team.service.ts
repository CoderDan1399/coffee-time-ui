import { Injectable } from '@angular/core';
import { ITeamService } from '../services/team.service';
import { Team } from '../redux/models/team.model';
import { Observable, of } from 'rxjs';
import { FakeDataService } from './fake-data.service';
import { tap, switchMap, map } from 'rxjs/operators';
import {
  Transaction,
  TransactionItem,
} from '../redux/models/transactrion.model';
import { UserStats } from '../redux/models/user.model';
import * as R from 'ramda';
import { U } from '../common/common';

const TRAN_KEY = 'TRANSACTIONS';
const TEAMS_KEY = 'TEAMS';
const USER_STATS_KEY = 'USER_STATS';

@Injectable()
export class FakeTeamService implements ITeamService {
  verifySecret(teamId: string, secret: string): Observable<boolean> {
    console.log('verifying', { teamId, secret });
    return this.getTeam(teamId).pipe(
      map(team => team && team['removedSecret'] === secret)
    );
  }
  constructor(private data: FakeDataService) {}

  addTeam(team: Team): Observable<any> {
    return of(null).pipe(tap(() => this.data.addToArray(TEAMS_KEY, team)));
  }

  updateTeam(team: Team): Observable<any> {
    return this.removeTeam(team.id).pipe(switchMap(() => this.addTeam(team)));
  }

  removeTeam(teamId: string): Observable<any> {
    return of(null).pipe(
      tap(() => {
        this.data.removeFromArray(TEAMS_KEY, item => item.id === teamId);
      })
    );
  }
  getTeam(id: string): Observable<Team> {
    return of(
      this.data.getFromArray<Team>(TEAMS_KEY, item => item.id === id)[0]
    ).pipe(
      // Remove secret
      map(
        val =>
          val ? { ...val, removedSecret: val.secret, secret: undefined } : val
      )
    );
  }

  addCoffee(transaction: Transaction, userSecret: string) {
    return of(null).pipe(
      tap(() => {
        let user = this.data.getFromArray<UserStats>(
          USER_STATS_KEY,
          item => item.userId === transaction.purchaserUserId
        )[0];

        if (!user) {
          user = {
            userId: transaction.purchaserUserId,
            purchased: 0,
            consumed: 0,
            refresh: true,
          };
        }
        this.data.replaceInArray<UserStats>(
          USER_STATS_KEY,
          user,
          u => user.userId === u.userId
        );

        this.data.addToArray(TRAN_KEY, transaction);

        const transactions = this.data.getFromArray<Transaction>(
          TRAN_KEY,
          tran => tran.teamId === transaction.teamId
        );
        user.purchased += U.pipe(
          U.filter(tran => tran.purchaserUserId === user.userId),
          U.map(tran => tran.items),
          U.flatten,
          U.map(item => item.qty),
          U.sum
        )(transaction);

        user.consumed += U.pipe(
          U.map((tran: Transaction) => tran.items),
          U.flatten,
          U.filter((item: TransactionItem) => item.userId === user.userId),
          U.map((item: TransactionItem) => item.qty),
          U.sum
        )(transaction)(transactions);
        user.refresh = false;

        this.data.replaceInArray(
          USER_STATS_KEY,
          user,
          item => item.userId === user.userId
        );
      })
    );
  }
}
