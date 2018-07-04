import { createSelector } from '@ngrx/store';
import { TeamSelectors } from './team.selectors';
import { UserSelectors } from './user.selectors';
import { UserStatsReducer } from '../reducers/user-stats.reducer';
import { getUserStatsState } from '../reducers';
import { Dictionary } from '../models/dictionary.model';
import { UserModels } from '../models/user.model';

export namespace UserStatsSelectors {
  export const getCommonSelectors = UserStatsReducer.adapter.getSelectors(
    getUserStatsState
  );

  export const getUserStatsSelector = createSelector(
    TeamSelectors.getCurrentTeamSelector,
    UserSelectors.getUsersForTeamSelector,
    getCommonSelectors.selectEntities,
    (team, users, userStats) => {
      const result: Dictionary<UserModels.UserStats> = {};
      Object.values(users).forEach(user => {
        if (userStats[user.id]) {
          result[user.id] = userStats[user.id];
        } else {
          result[user.id] = {
            consumed: 0,
            purchased: 0,
            teamId: team.id,
            id: user.id,
          };
        }
      });
      return result;
    }
  );
}
