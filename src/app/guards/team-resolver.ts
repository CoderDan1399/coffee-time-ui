import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Team } from '../redux/models/team.model';
import { TeamService } from '../services/team.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { TeamActions } from '../redux/actions/team.actions';
import { ApplicationActions } from '../redux/actions/application.actions';

@Injectable()
export class TeamResolver implements Resolve<Team> {
  constructor(
    private teamService: TeamService,
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
      })
    );
  }
}
