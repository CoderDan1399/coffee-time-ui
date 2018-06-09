import { User } from '../models/user.model';
import { ActionWithPayload } from '../actions/common';
import { ApplicationModels } from '../models/application.model';
import { ApplicationActions } from '../actions/application.actions';

export interface State extends ApplicationModels.Application {}

const initialState = { currentTeam: null, currentUser: null };

export function reducer(
  state: State = initialState,
  action: ActionWithPayload
) {
  switch (action.type) {
    case ApplicationActions.ActionTypes.update:
      return { ...state, ...action.payload };
  }
  return state;
}
