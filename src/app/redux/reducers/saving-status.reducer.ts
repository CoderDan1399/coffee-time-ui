import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  combineReducers,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';

import { TransactionActions } from '../actions/transaction.actions';
import { SavingStatusModels } from '../models/saving-status.models';
import { SavingStatusActions } from '../actions/saving-status.actions';

export namespace SavingStatusReducer {
  const actionTypes = SavingStatusActions.ActionTypes;
  type EntityType = SavingStatusModels.SavingStatus;
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
    switch (action.type) {
      case SavingStatusActions.ActionTypes.Save: {
        return adapter.upsertOne(
          SavingStatusModels.savingStatus(action.payload),
          state
        );
      }
      case SavingStatusActions.ActionTypes.SaveSuccess: {
        return adapter.upsertOne(
          SavingStatusModels.hasSavedStatus(action.payload),
          state
        );
      }
      case SavingStatusActions.ActionTypes.SaveFail: {
        const failAction = action as SavingStatusActions.SaveFail;
        return adapter.upsertOne(
          SavingStatusModels.saveFailStatus(
            failAction.payload.id,
            failAction.payload.error,
            failAction.payload.errorObject
          ),
          state
        );
      }
    }
    return state;
  };

  const combinedReducer = combineReducers(commonReducer, customReducer);

  export function reducer(state, action) {
    return combinedReducer(state, action);
  }
}
