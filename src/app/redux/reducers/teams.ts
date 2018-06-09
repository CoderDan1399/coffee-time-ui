import { Team } from '../models/team.model';
import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { TeamActions } from '../actions/team.actions';
import {
  entityAdapterReducer,
  combineReducers,
  getSavingState,
  getSavedState,
  getSaveFailState,
  getInitialSavingState,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';

export interface State extends EntityState<Team> {
  saving: boolean;
  saved: boolean;
  saveFail: any;
}

const adapter = createEntityAdapter<Team>();

const initialState = adapter.getInitialState(getInitialSavingState());

const actionTypes = TeamActions.ActionTypes;

export function reducer(
  state: State = initialState,
  action: ActionWithPayload
) {
  state = entityAdapterReducer(adapter, TeamActions.ActionTypes, state, action);
  switch (action.type) {
    case TeamActions.ActionTypes.Save: {
      return { ...state, ...getSavingState() };
    }
    case TeamActions.ActionTypes.SaveSuccess: {
      return { ...state, ...getSavedState() };
    }
    case TeamActions.ActionTypes.SaveFail: {
      return { ...state, ...getSaveFailState(action.payload) };
    }
  }
  return state;
}
