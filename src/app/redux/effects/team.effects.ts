import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TeamActions } from '../actions/team.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { of } from 'rxjs';

@Injectable()
export class TeamEffects {
  constructor(private actions: Actions, private teamService: TeamService) {}

  @Effect()
  public save$ = this.actions.ofType(TeamActions.ActionTypes.Save).pipe(
    tap(() => console.log('in effect')),
    switchMap((action: TeamActions.Save) => {
      return this.teamService.addTeam(action.payload).pipe(
        map(() => new TeamActions.SaveSuccess()),
        catchError(err => {
          console.error(err);
          return of(new TeamActions.SaveFail('failed to create team'));
        })
      );
    })
  );
}
