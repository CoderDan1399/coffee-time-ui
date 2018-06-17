import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Team } from '../redux/models/team.model';
import { TeamService } from '../services/team.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, switchMap, map } from 'rxjs/operators';
import { TeamActions } from '../redux/actions/team.actions';
import { ApplicationActions } from '../redux/actions/application.actions';
import { UserService } from '../services/user.service';
import { UserActions } from '../redux/actions/user.actions';
import { always } from 'ramda';
import { TransactionService } from '../services/transaction.service';
import { UserStatsActions } from '../redux/actions/user-stats.action';

@Injectable()
export class TeamResolver implements Resolve<Team> {
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private transactionService: TransactionService,
    private store: Store<any>,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Team | Observable<Team> | Promise<Team> {
    return this.teamService.getTeam(route.params['teamId']).pipe(
      tap(team => {
        if (team) {
          this.store.dispatch(new TeamActions.UpsertOne(team));
          this.store.dispatch(
            new ApplicationActions.Update({ currentTeam: team.id })
          );
        } else {
          this.router.navigate(['not-found']);
        }
      }),
      switchMap(team =>
        this.userService.getUsersForTeam(team.id).pipe(
          tap(users => this.store.dispatch(new UserActions.UpsertMany(users))),
          switchMap(() => this.transactionService.getUserStatsForTeam(team.id)),
          tap(userStats => {
            this.store.dispatch(new UserStatsActions.UpsertMany(userStats));
          }),
          map(always(team))
        )
      )
    );
  }
}
