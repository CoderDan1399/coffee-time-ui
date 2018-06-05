import { createSelector } from '@ngrx/store';

export const getRouterState = state => state.router;

export const getUrlSelector = createSelector(
  getRouterState,
  router => (router && router.state ? router.state.url : undefined)
);
