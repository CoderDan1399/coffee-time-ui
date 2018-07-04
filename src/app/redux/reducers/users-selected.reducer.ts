import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Id as EntityType } from '../models/id.model';
import {
  combineReducers,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';
import { UserActions } from '../actions/user.actions';
import { UsersSelectedActions } from '../actions/users-selected.actions';

export namespace UsersSelectedReducer {
  export interface State extends EntityState<EntityType> {
    buyerUserId: string;
  }

  export const adapter = createEntityAdapter<EntityType>();

  const initialState = adapter.getInitialState({ buyerUserId: null });

  const actionTypes = UsersSelectedActions.ActionTypes;

  const commonReducer = entityAdapterReducerFactory(
    adapter,
    actionTypes,
    initialState
  );

  const customReducer = (
    state: State = initialState,
    action: ActionWithPayload
  ) => {
    // placeholder for custom reducer methods.
    switch (action.type) {
      case UsersSelectedActions.ActionTypes.SelectBuyer: {
        return { ...state, buyerUserId: action.payload };
      }
      case UsersSelectedActions.ActionTypes.SelectUser: {
        if (state.entities[action.payload]) {
          return adapter.removeOne(action.payload, state);
        } else {
          return adapter.addOne({ id: action.payload }, state);
        }
      }
      case UsersSelectedActions.ActionTypes.Clear: {
        return initialState;
      }
    }
    return state;
  };

  const combinedReducer = combineReducers(commonReducer, customReducer);

  export function reducer(state, action) {
    return combinedReducer(state, action);
  }
}
