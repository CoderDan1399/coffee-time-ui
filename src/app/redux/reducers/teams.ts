import { Team } from '../models/team.model';
import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { TeamActions } from '../actions/team.actions';
import {
  entityReducerFactory,
  combineReducers,
  getSavingState,
  getSavedState,
  getSaveFailState,
  getInitialSavingState,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';

export interface TeamState extends EntityState<Team> {
  saving: boolean;
  saved: boolean;
  saveFail: any;
}

export const adapter = createEntityAdapter<Team>();

export const initialState = adapter.getInitialState(getInitialSavingState());

export const commonReducer = entityReducerFactory(
  adapter,
  initialState,
  TeamActions.ActionTypes
);

export function customReducer(
  state: TeamState = initialState,
  action: ActionWithPayload
) {
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

export const reducer = combineReducers(commonReducer, customReducer);
