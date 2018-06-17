import { Team as EntityType } from '../models/team.model';
import { ActionWithPayload } from './common';

export namespace TeamToUserActions {
  export enum ActionTypes {
    AddOne = '[team to user] add one',
    AddAll = '[team to user] add all',
    AddMany = '[team to user] add many',
    UpdateOne = '[team to user] update one',
    RemoveOne = '[team to user] remove one',
    UpsertOne = '[team to user] upsert one',
    UpsertMany = '[team to user] upsert many',
  }
  export class AddOne implements ActionWithPayload {
    readonly type: string = ActionTypes.AddOne;
    constructor(public payload: EntityType) {}
  }

  export class AddAll implements ActionWithPayload {
    readonly type: string = ActionTypes.AddAll;
    constructor(public payload: EntityType[]) {}
  }

  export class UpsertMany implements ActionWithPayload {
    readonly type: string = ActionTypes.UpsertMany;
    constructor(public payload: EntityType[]) {}
  }

  export class AddMany implements ActionWithPayload {
    readonly type: string = ActionTypes.AddMany;
    constructor(public payload: EntityType[]) {}
  }

  export class UpsertOne implements ActionWithPayload {
    readonly type: string = ActionTypes.UpsertOne;
    constructor(public payload: EntityType) {}
  }

  export class UpdateOne implements ActionWithPayload {
    readonly type: string = ActionTypes.UpdateOne;
    constructor(public payload: EntityType) {}
  }

  export class RemoveOne implements ActionWithPayload {
    readonly type: string = ActionTypes.RemoveOne;
    constructor(public payload: string) {}
  }

  export type ActionsUnion =
    | AddOne
    | RemoveOne
    | UpdateOne
    | UpsertOne
    | AddAll
    | AddMany
    | AddOne
    | UpsertMany
    | UpsertOne;
}
