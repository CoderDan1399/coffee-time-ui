import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TransactionActions } from '../actions/transaction.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { of } from 'rxjs';

@Injectable()
export class TransactionEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService
  ) {}
  @Effect()
  public save$ = this.actions$.ofType(TransactionActions.ActionTypes.Save).pipe(
    switchMap((action: TransactionActions.Save) => {
      return this.transactionService
        .add(action.payload.transaction, action.payload.userSecret)
        .pipe(
          map(() => new TransactionActions.SaveSuccess()),
          catchError(err => {
            console.error(err);
            return of(
              new TransactionActions.SaveFail('failed to save transaction')
            );
          })
        );
    })
  );
}
