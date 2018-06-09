import { EntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { ActionWithPayload } from '../../redux/actions/common';

export interface EntityActionTypes {
  AddOne: string;
  UpdateOne: string;
  RemoveOne: string;
  UpsertOne: string;
}

export function entityAdapterReducer<T>(
  adapter: EntityAdapter<T>,
  actionTypes: EntityActionTypes,
  state,
  action: ActionWithPayload
) {
  switch (action.type) {
    case actionTypes.AddOne: {
      return adapter.addOne(action.payload, state);
    }
    case actionTypes.UpdateOne: {
      return adapter.updateOne(action.payload, state);
    }
    case actionTypes.RemoveOne: {
      return adapter.removeOne(action.payload, state);
    }
    case actionTypes.UpsertOne: {
      return adapter.upsertOne(action.payload, state);
    }
  }
  return state;
}

export function combineReducers(...reducers) {
  return function reducer(state, action) {
    return reducers.reduce((prev, curr) => curr(prev, action), state);
  };
}

export interface SaveStatus {
  saving: boolean;
  saved: boolean;
  saveFail: any;
}
export interface LoadStatus {
  loading: boolean;
  loaded: boolean;
  loadFail: any;
}

export function getInitialSavingState(): SaveStatus {
  return { saving: false, saved: false, saveFail: null };
}
export function getSavingState(): SaveStatus {
  return { saving: true, saved: false, saveFail: null };
}
export function getSavedState(): SaveStatus {
  return { saving: false, saved: true, saveFail: null };
}

export function getSaveFailState(err): SaveStatus {
  return { saving: false, saved: false, saveFail: err };
}
