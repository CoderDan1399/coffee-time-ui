import { EntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { ActionWithPayload } from '../../redux/actions/common';

export interface EntityActionTypes {
  AddOne: string;
  AddAll: string;
  AddMany: string;
  UpdateOne: string;
  RemoveOne: string;
  UpsertOne: string;
  UpsertMany: string;
}

export function entityAdapterReducerFactory<T>(
  adapter: EntityAdapter<T>,
  actionTypes: EntityActionTypes,
  initialState
) {
  return function(state = initialState, action) {
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
      case actionTypes.AddAll: {
        return adapter.addAll(action.payload, state);
      }
      case actionTypes.AddMany: {
        return adapter.addMany(action.payload, state);
      }
      case actionTypes.UpsertMany: {
        return adapter.upsertMany(action.payload, state);
      }
    }
    return state;
  };
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
