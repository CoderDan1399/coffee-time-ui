import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TeamActions } from '../actions/team.actions';
import { switchMap, catchError, map, tap, merge } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserActions } from '../actions/user.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private userService: UserService) {}

  @Effect()
  public save$ = this.actions.ofType(UserActions.ActionTypes.Save).pipe(
    switchMap((action: UserActions.Save) => {
      return this.userService.addUser(action.payload).pipe(
        map(() => new UserActions.SaveSuccess()),
        merge(of<Action>(new UserActions.AddOne(action.payload))),
        catchError(err => {
          console.error(err);
          return of(new UserActions.SaveFail('failed to create user'));
        })
      );
    })
  );
}
