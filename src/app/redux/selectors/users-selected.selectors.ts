import { UsersSelectedReducer } from '../reducers/users-selected.reducer';
import { getUsersSelectedState } from '../reducers';

export namespace UsersSelectedSelectors {
  export const getUsersSelectedCommonSelectors = UsersSelectedReducer.adapter.getSelectors(
    getUsersSelectedState
  );
}
