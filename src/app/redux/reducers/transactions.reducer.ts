import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  combineReducers,
  getSavingState,
  getSavedState,
  getSaveFailState,
  getInitialSavingState,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';
import { UserActions } from '../actions/user.actions';
import { Transaction as EntityType } from '../models/transactrion.model';

export namespace TransactionsReducer {
  const actionTypes = UserActions.ActionTypes;
  export interface State extends EntityState<EntityType> {
    saving: boolean;
    saved: boolean;
    saveFail: any;
  }

  export const adapter = createEntityAdapter<EntityType>();

  const initialState = adapter.getInitialState(getInitialSavingState());

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
      case actionTypes.Save: {
        return { ...state, ...getSavingState() };
      }
      case actionTypes.SaveSuccess: {
        return { ...state, ...getSavedState() };
      }
      case actionTypes.SaveFail: {
        return { ...state, ...getSaveFailState(action.payload) };
      }
    }
    return state;
  };

  const combinedReducer = combineReducers(commonReducer, customReducer);

  export function reducer(state, action) {
    return combinedReducer(state, action);
  }
}
