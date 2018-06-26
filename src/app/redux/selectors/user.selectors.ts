import { createSelector } from '@ngrx/store';
import {
  getUsersState as getState,
  getUsersState,
  getRouterState,
} from '../reducers';
import { ApplicationSelectors } from './application.selectors';
import { UsersReducer } from '../reducers/users.reducer';
import { RouterSelectors } from './router.selectors';
import { isNil } from 'ramda';
import { UserModels } from '../models/user.model';

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

  export const getUserCredentialsSelector = createSelector(
    RouterSelectors.getFirstChildSelector,
    childRoute => {
      if (isNil(childRoute)) {
        return;
      }
      return <UserModels.UserCredentials>{
        userId: childRoute.params.userId,
        teamId: childRoute.params.teamId,
        userSecret: childRoute.queryParams.userSecret,
      };
    }
  );
}
