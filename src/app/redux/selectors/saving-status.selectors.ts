import { SavingStatusReducer } from '../reducers/saving-status.reducer';
import { getSavingStatusState } from '../reducers';
import { createSelector } from '@ngrx/store';

export namespace SavingStatusSelectors {
  export const commonSelectors = SavingStatusReducer.adapter.getSelectors(
    getSavingStatusState
  );

  export function getSavingStatusSelectorFactory(key: string) {
    return createSelector(commonSelectors.selectEntities, state => state[key]);
  }
}
