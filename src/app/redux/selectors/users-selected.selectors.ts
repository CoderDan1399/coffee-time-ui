import { UsersSelectedReducer } from '../reducers/users-selected.reducer';
import { getUsersSelectedState } from '../reducers';
import { createSelector } from '@ngrx/store';

export namespace UsersSelectedSelectors {
  export const commonSelectors = UsersSelectedReducer.adapter.getSelectors(
    getUsersSelectedState
  );
  export const getBuyerUserIdSelector = createSelector(
    getUsersSelectedState,
    state => state.buyerUserId
  );
}
