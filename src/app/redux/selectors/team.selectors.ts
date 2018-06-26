import { createSelector } from '@ngrx/store';
import { RouterSelectors } from './router.selectors';
import { getTeamsState, getTeamsCommonSelectors } from '../reducers';

export namespace TeamSelectors {
  export const getCurrentTeamSelector = createSelector(
    RouterSelectors.getTeamIdSelector,
    getTeamsCommonSelectors.selectEntities,
    (teamId, teams) => (teamId && teams ? teams[teamId] : undefined)
  );
}
