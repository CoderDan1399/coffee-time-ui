import { Action } from '@ngrx/store';
import { TransactionActions } from '../actions/transaction.actions';
import { SavingStatusActions } from '../actions/saving-status.actions';
import { SavingStatusModels } from '../models/saving-status.models';
import { TransactionModels } from '../models/transaction.model';

export namespace ActionDispatchers {
  export function createSaveTransactionActions(
    transaction: TransactionModels.Transaction,
    userId: string,
    userSecret: string
  ): Action[] {
    const actions = [
      new SavingStatusActions.Save(
        SavingStatusModels.createKey(
          SavingStatusModels.SAVING_TRANSACTION_KEY,
          transaction.id
        )
      ),
      new TransactionActions.Save({
        transaction,
        userId,
        userSecret,
      }),
    ];
    console.log(actions);
    return actions;
  }
}
