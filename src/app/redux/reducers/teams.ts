import { Team } from '../models/team.models';
import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Actions } from '../actions/actions';

export interface TeamState extends EntityState<Team> {}

export const adapter = createEntityAdapter<Team>();

export const initialState = adapter.getInitialState();

export function reducer(
  state: TeamState = initialState,
  action: Actions.ActionsUnion
) {
  switch (action.type) {
    case Actions.ActionTypes.CreateTeam: {
      return adapter.addOne(action.team, state);
    }
  }
}
