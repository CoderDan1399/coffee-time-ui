import { Team as EntityType } from '../models/team.model';
import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { TeamActions } from '../actions/team.actions';
import {
  combineReducers,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';

export namespace TeamsReducer {
  export interface State extends EntityState<EntityType> {}
  export const adapter = createEntityAdapter<EntityType>();

  const initialState = adapter.getInitialState();

  const actionTypes = TeamActions.ActionTypes;

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
