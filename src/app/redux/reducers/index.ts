import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import * as fromApplication from './application';
import * as fromTeamToUsers from './team-to-users.reducer';
import { TeamsReducer } from './teams.reducer';
import { UsersReducer } from './users.reducer';
import { UsersSelectedReducer } from './users-selected.reducer';
import { TransactionsReducer } from './transactions.reducer';
import { TransactionItemsReducer } from './transaction-items.reducer';
import { UserStatsReducer } from './user-stats.reducer';
import { SavingStatusReducer } from './saving-status.reducer';

export interface State {
  router: any;
  teams: TeamsReducer.State;
  application: fromApplication.State;
  users: UsersReducer.State;
  teamToUsers: fromTeamToUsers.State;
  usersSelected: UsersSelectedReducer.State;
  transactions: TransactionsReducer.State;
  transactionItems: TransactionItemsReducer.State;
  userStats: UserStatsReducer.State;
  savingStatus: SavingStatusReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  teams: TeamsReducer.reducer,
  users: UsersReducer.reducer,
  application: fromApplication.reducer,
  teamToUsers: fromTeamToUsers.reducer,
  usersSelected: UsersSelectedReducer.reducer,
  transactions: TransactionsReducer.reducer,
  transactionItems: TransactionItemsReducer.reducer,
  userStats: UserStatsReducer.reducer,
  savingStatus: SavingStatusReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = environment.production
  ? []
  : [logger, storeFreeze];

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('action', action);

    let newState = reducer(state, action);
    console.log('new state', newState);
    return newState;
  };
}

// Teams
export const getTeamsState = (state: State) => state.teams;
export const getTeamsCommonSelectors = TeamsReducer.adapter.getSelectors(
  getTeamsState
);

// Users
export const getUsersState = (state: State) => state.users;

// Application
export const getApplicationState = (state: State) => state.application;

// router
export const getRouterState = state => state.router;

// Users selected
export const getUsersSelectedState = (state: State) => state.usersSelected;

export const getTransactionsState = (state: State) => state.transactions;

export const getTransactionItemsState = (state: State) =>
  state.transactionItems;

export const getUserStatsState = (state: State) => state.userStats;

export const getSavingStatusState = (state: State) => state.savingStatus;
