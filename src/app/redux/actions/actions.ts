import { Action } from '@ngrx/store';
import { Team } from '../models/team.models';

export namespace Actions {
  export enum ActionTypes {
    CreateTeam = 'Create Team',
  }
  export class CreateTeam implements Action {
    type: string = ActionTypes.CreateTeam;
    constructor(public team: Team) {}
  }

  export type ActionsUnion = CreateTeam;
}
