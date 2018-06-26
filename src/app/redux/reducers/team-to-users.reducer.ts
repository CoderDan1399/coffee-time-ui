import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  combineReducers,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';

import { TeamToUsers as EntityType } from '../models/team.model';
import { TeamToUserActions } from '../actions/team-to-user.actions';

export interface State extends EntityState<EntityType> {}

const adapter = createEntityAdapter<EntityType>();

const initialState = adapter.getInitialState();

const actionTypes = TeamToUserActions.ActionTypes;

const commonReducer = entityAdapterReducerFactory(
  adapter,
  actionTypes,
  initialState
);

export function reducer(state, action) {
  return commonReducer(state, action);
}
