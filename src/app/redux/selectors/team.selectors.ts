import { createSelector } from '@ngrx/store';
import { RouterSelectors } from './router.selectors';
import { getTeamsState, getTeamsCommonSelectors } from '../reducers';

export namespace TeamSelectors {
  export const getCurrentTeamSelector = createSelector(
    RouterSelectors.getTeamIdSelector,
    getTeamsCommonSelectors.selectEntities,
    (teamId, teams) => (teamId && teams ? teams[teamId] : undefined)
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
}
