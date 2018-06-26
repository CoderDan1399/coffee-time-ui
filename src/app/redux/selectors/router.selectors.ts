import { createSelector } from '@ngrx/store';
import { getRouterState } from '../reducers';

export namespace RouterSelectors {
  export const getUrlSelector = createSelector(
    getRouterState,
    router => (router && router.state ? router.state.url : undefined)
  );
  export const getFirstChildSelector = createSelector(
    getRouterState,
    router => {
      if (
        router &&
        router.state &&
        router.state.root &&
        router.state.root.firstChild
      ) {
        return router.state.root.firstChild;
      }
    }
  );

  export const getTeamIdSelector = createSelector(
    getFirstChildSelector,
    child => (child.params.teamId ? child.params.teamId : undefined)
  );
}
