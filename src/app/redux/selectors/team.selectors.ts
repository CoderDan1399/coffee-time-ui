import { createSelector } from '@ngrx/store';
import { getTeamsState } from '../reducers';

export const getCurrentTeamSelector = createSelector(
  getTeamsState,
  state => state
);

export const getHasSavedSelector = createSelector(
  getTeamsState,
  state => state.saved
);
export const getIsSavingSelector = createSelector(
  getTeamsState,
  state => state.saving
);
export const getSaveFailedSelector = createSelector(
  getTeamsState,
  state => state.saveFail
);
