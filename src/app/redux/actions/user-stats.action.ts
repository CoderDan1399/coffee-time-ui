import { ActionWithPayload } from './common';
import { UserStats } from '../models/user.model';

export namespace UserStatsActions {
  type EntityType = UserStats;
  export enum ActionTypes {
    AddOne = '[user stats] add one',
    AddAll = '[user stats] add all',
    AddMany = '[user stats] add many',
    UpdateOne = '[user stats] update one',
    RemoveOne = '[user stats] remove one',
    UpsertOne = '[user stats] upsert one',
    UpsertMany = '[user stats] upsert many',
    Save = '[user stats] save',
    SaveSuccess = '[user stats] save success',
    SaveFail = '[user stats] save fail',
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

  export class Save implements ActionWithPayload {
    readonly type: string = ActionTypes.Save;
    constructor(public payload: EntityType) {}
  }

  export class SaveSuccess implements ActionWithPayload {
    readonly type: string = ActionTypes.SaveSuccess;
    constructor() {}
  }

  export class SaveFail implements ActionWithPayload {
    readonly type: string = ActionTypes.SaveFail;
    constructor(public payload: any) {}
  }

  export type ActionsUnion =
    | AddOne
    | Save
    | SaveSuccess
    | SaveFail
    | RemoveOne
    | UpdateOne
    | AddAll
    | AddMany
    | UpsertMany
    | UpsertOne;
}
