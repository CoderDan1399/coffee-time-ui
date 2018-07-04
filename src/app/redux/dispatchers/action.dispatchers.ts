import { Action, Store } from '@ngrx/store';
import { TransactionActions } from '../actions/transaction.actions';
import { SavingStatusActions } from '../actions/saving-status.actions';
import { SavingStatusModels } from '../models/saving-status.models';
import { TransactionModels } from '../models/transaction.model';
import { SavingStatusSelectors } from '../selectors/saving-status.selectors';
import { filter, map, first } from 'rxjs/operators';

export namespace ActionDispatchers {
  export function dispatchSaveTransaction(
    store: Store<any>,
    transaction: TransactionModels.Transaction,
    userId: string,
    userSecret: string
  ) {
    createSaveTransactionActions(transaction, userId, userSecret).forEach(
      action => store.dispatch(action)
    );
  }
  export function waitForSave(store: Store<any>, transactionId: string) {
    const key = SavingStatusModels.createKey(
      SavingStatusModels.SAVING_TRANSACTION_KEY,
      transactionId
    );
    const selector = SavingStatusSelectors.getSavingStatusSelectorFactory(key);
    return store.select(selector).pipe(
      filter<SavingStatusModels.SavingStatus>(Boolean),
      filter<SavingStatusModels.SavingStatus>(
        state => !!state.hasSaved || !!state.error
      ),
      first()
    );
  }
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
    return actions;
  }
}
