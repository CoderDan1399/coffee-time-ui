import { createSelector } from '@ngrx/store';
import { getUsersState as getState, getUsersState } from '../reducers';
import { ApplicationSelectors } from './application.selectors';
import { UsersReducer } from '../reducers/users.reducer';

export namespace UserSelectors {
  export const commonSelectors = UsersReducer.adapter.getSelectors(
    getUsersState
  );
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

  export const getUsersForTeamSortedByCurrentUser = createSelector(
    getUsersForTeamSelector,
    getCurrentUser,
    (users, currentUser) => {
      return [currentUser, ...users.filter(u => u.id !== currentUser.id)];
    }
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
