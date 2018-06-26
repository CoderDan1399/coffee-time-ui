import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  combineReducers,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';
import { UserActions } from '../actions/user.actions';
import { UserModels } from '../models/user.model';

type EntityType = UserModels.User;
export namespace UsersReducer {
  const actionTypes = UserActions.ActionTypes;

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
    }
    return state;
  };

  const combinedReducer = combineReducers(commonReducer, customReducer);

  export function reducer(state, action) {
    return combinedReducer(state, action);
  }
}
