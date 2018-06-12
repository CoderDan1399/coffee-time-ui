import { createSelector } from '@ngrx/store';
import { getUsersState as getState, getUsersState } from '../reducers';
import { adapter } from '../reducers/users.reducer';

export namespace UserSelectors {
  export const getHasSavedSelector = createSelector(
    getState,
    state => state.saved
  );
  export const getIsSavingSelector = createSelector(
    getState,
    state => state.saving
  );
  export const getSaveFailedSelector = createSelector(
    getState,
    state => state.saveFail
  );

  export const commonSelectors = adapter.getSelectors(getUsersState);
}
