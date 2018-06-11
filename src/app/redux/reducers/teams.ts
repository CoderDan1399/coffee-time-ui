import { Team } from '../models/team.model';
import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { TeamActions } from '../actions/team.actions';
import {
  combineReducers,
  getSavingState,
  getSavedState,
  getSaveFailState,
  getInitialSavingState,
  entityAdapterReducerFactory,
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
};

const combinedReducer = combineReducers(commonReducer, customReducer);
export function reducer(state, action) {
  return combinedReducer(state, action);
}
