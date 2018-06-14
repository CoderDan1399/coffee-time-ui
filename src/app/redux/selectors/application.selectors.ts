import { createSelector } from '@ngrx/store';
import { getApplicationState } from '../reducers';

export namespace ApplicationSelectors {
  export const getCurrentUserIdSelector = createSelector(
    getApplicationState,
    state => state.currentUser
  );

  export const getCurrentTeamIdSelector = createSelector(
    getApplicationState,
    state => state.currentTeam
  );
}
