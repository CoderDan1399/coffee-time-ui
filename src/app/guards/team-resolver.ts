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
import { delay } from 'rxjs/internal/operators/delay';

@Injectable()
export class TeamResolver implements Resolve<Team> {
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private store: Store<any>,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Team | Observable<Team> | Promise<Team> {
    console.log('route', route);
    return this.teamService.getTeam(route.params['teamId']).pipe(
      tap(team => {
        if (team) {
          this.store.dispatch(new TeamActions.UpsertOne(team));
          this.store.dispatch(
            new ApplicationActions.Update({ currentTeam: team.id })
          );
        } else {
          console.log('going not found');
          this.router.navigate(['not-found']);
        }
      }),
      switchMap(team =>
        this.userService.getUsersForTeam(team.id).pipe(
          tap(users => this.store.dispatch(new UserActions.AddAll(users))),
          map(always(team))
        )
      )
    );
  }
}
