import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Id as EntityType } from '../models/id.model';
import {
  combineReducers,
  getInitialSavingState,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';
import { UserActions } from '../actions/user.actions';
import { UsersSelectedActions } from '../actions/users-selected.actions';

export namespace UsersSelectedReducer {
  export interface State extends EntityState<EntityType> {}

  export const adapter = createEntityAdapter<EntityType>();

  const initialState = adapter.getInitialState();

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
      case UsersSelectedActions.ActionTypes.SelectUser: {
        if (state.entities[action.payload]) {
          return adapter.removeOne(action.payload, state);
        } else {
          return adapter.addOne({ id: action.payload }, state);
        }
      }
    }
    return state;
  };

  const combinedReducer = combineReducers(commonReducer, customReducer);

  export function reducer(state, action) {
    return combinedReducer(state, action);
  }
}
