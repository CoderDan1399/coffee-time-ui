import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TransactionActions } from '../actions/transaction.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { SavingStatusActions } from '../actions/saving-status.actions';
import { SavingStatusModels } from '../models/saving-status.models';
import { Action } from '@ngrx/store';

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
          mergeMap(() =>
            of<Action>(
              new TransactionActions.SaveSuccess(),
              new SavingStatusActions.SaveSuccess(
                SavingStatusModels.createKey(
                  SavingStatusModels.SAVING_TRANSACTION_KEY,
                  action.payload.transaction.id
                )
              )
            )
          ),
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
