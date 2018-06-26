import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TeamActions } from '../actions/team.actions';
import {
  switchMap,
  catchError,
  map,
  tap,
  merge,
  mergeMap,
} from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { SavingStatusActions } from '../actions/saving-status.actions';
import { SavingStatusModels } from '../models/saving-status.models';
import { of } from 'rxjs';

@Injectable()
export class TeamEffects {
  constructor(private actions: Actions, private teamService: TeamService) {}

  @Effect()
  public save$ = this.actions.ofType(TeamActions.ActionTypes.Save).pipe(
    switchMap((action: TeamActions.Save) => {
      return this.teamService.addTeam(action.payload).pipe(
        mergeMap(() =>
          of(
            new TeamActions.UpsertOne(action.payload),
            new SavingStatusActions.SaveSuccess(
              SavingStatusModels.createKey(
                SavingStatusModels.SAVING_TEAM_KEY,
                action.payload.id
              )
            )
          )
        ),
        catchError(err => {
          console.error(err);
          return of(new TeamActions.SaveFail('failed to create team'));
        })
      );
    })
  );
}
