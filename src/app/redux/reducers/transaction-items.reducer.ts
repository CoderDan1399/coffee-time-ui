import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  combineReducers,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';

import { TransactionItemActions } from '../actions/transaction-item.actions';
import { TransactionModels } from '../models/transaction.model';

type EntityType = TransactionModels.TransactionItem;
export namespace TransactionItemsReducer {
  const actionTypes = TransactionItemActions.ActionTypes;

  export interface State extends EntityState<EntityType> {}

  export const adapter = createEntityAdapter<EntityType>();

  const initialState = adapter.getInitialState();

  const commonReducer = entityAdapterReducerFactory(
    adapter,
    actionTypes,
    initialState
  );

  const customReducer = (
    state: State = initialState,
    action: ActionWithPayload
  ) => {
    return state;
  };

  const combinedReducer = combineReducers(commonReducer, customReducer);

  export function reducer(state, action) {
    return combinedReducer(state, action);
  }
}
