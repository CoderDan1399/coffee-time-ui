import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  combineReducers,
  entityAdapterReducerFactory,
} from '../../common/redux/entity-adapter';
import { ActionWithPayload } from '../actions/common';
import { UserStatsActions } from '../actions/user-stats.action';
import { UserModels } from '../models/user.model';
import { TransactionModels } from '../models/transaction.model';
import * as R from 'ramda';

export namespace UserStatsReducer {
  const actionTypes = UserStatsActions.ActionTypes;
  type EntityType = UserModels.UserStats;

  export interface State extends EntityState<EntityType> {}

  export const adapter = createEntityAdapter<EntityType>();

  const initialState = adapter.getInitialState();

  const commonReducer = entityAdapterReducerFactory(
    adapter,
    actionTypes,
    initialState
  );

  const customReducer = (
    state: State = initialState,
    action: ActionWithPayload
  ) => {
    switch (action.type) {
      case actionTypes.AddTransaction: {
        const transaction: TransactionModels.Transaction = action.payload;
        state = updatePurchasedFromTransaction(state, transaction);
        state = updateConsumedStatFromTransaction(state, transaction);
      }
    }
    return state;
  };

  export function updateConsumedStatFromTransaction(
    state: State,
    transaction: TransactionModels.Transaction
  ): State {
    transaction.items.forEach(item => {
      if (!state.entities[item.userId]) {
        state = adapter.addOne(
          {
            consumed: item.qty,
            id: item.userId,
            purchased: 0,
            teamId: transaction.teamId,
          },
          state
        );
      } else {
        const consumed = state.entities[item.userId].consumed + item.qty;
        state = adapter.updateOne(
          { id: item.userId, changes: { consumed } },
          state
        );
      }
    });
    return state;
  }
  export function updatePurchasedFromTransaction(
    state: State,
    transaction: TransactionModels.Transaction
  ): State {
    const totalPurchased = transaction.items.reduce(
      (prev, curr) => prev + curr.qty,
      0
    );
    if (!state.entities[transaction.purchaserUserId]) {
      state = adapter.addOne(
        {
          consumed: 0,
          id: transaction.purchaserUserId,
          purchased: totalPurchased,
          teamId: transaction.teamId,
        },
        state
      );
    } else {
      state = adapter.updateOne(
        {
          id: transaction.purchaserUserId,
          changes: {
            purchased:
              state.entities[transaction.purchaserUserId].purchased +
              totalPurchased,
          },
        },
        state
      );
    }
    return state;
  }

  const combinedReducer = combineReducers(commonReducer, customReducer);

  export function reducer(state, action) {
    return combinedReducer(state, action);
  }
}
