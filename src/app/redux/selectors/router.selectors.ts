import { createSelector } from '@ngrx/store';
import { getRouterState } from '../reducers';

export namespace RouterSelectors {
  export const getUrlSelector = createSelector(
    getRouterState,
    router => (router && router.state ? router.state.url : undefined)
  );

  export const getTeamIdSelector = createSelector(
    getRouterState,
    router =>
      router &&
      router.state &&
      router.state.root &&
      router.state.root.firstChild &&
      router.state.root.firstChild.params.teamId
        ? router.state.root.firstChild.params.teamId
        : undefined
  );
}
