import { createSelector } from '@ngrx/store';
import { getUsersState as getState, getUsersState } from '../reducers';
import { adapter } from '../reducers/users.reducer';
import { ApplicationSelectors } from './application.selectors';

export namespace UserSelectors {
  export const commonSelectors = adapter.getSelectors(getUsersState);
  export const getCurrentUser = createSelector(
    ApplicationSelectors.getCurrentUserIdSelector,
    UserSelectors.commonSelectors.selectEntities,
    (userId, users) => (userId && users ? users[userId] : undefined)
  );
  export const getUsersForTeamSelector = createSelector(
    ApplicationSelectors.getCurrentTeamIdSelector,
    commonSelectors.selectAll,
    (teamId, users) => users.filter(user => user.teamId === teamId)
  );
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
}
