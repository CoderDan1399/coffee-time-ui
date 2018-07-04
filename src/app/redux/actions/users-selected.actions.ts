import { Id as EntityType } from '../models/id.model';
import { ActionWithPayload } from './common';

export namespace UsersSelectedActions {
  export enum ActionTypes {
    AddOne = '[users selected] add one',
    AddAll = '[users selected] add all',
    AddMany = '[users selected] add many',
    UpdateOne = '[users selected] update one',
    RemoveOne = '[users selected] remove one',
    UpsertOne = '[users selected] upsert one',
    UpsertMany = '[users selected] upsert many',

    SelectUser = '[users selected] select user',
    SelectBuyer = '[users selected] select buyer',
    Clear = '[users selected] clear',
  }

  export class Clear implements ActionWithPayload {
    readonly type: string = ActionTypes.Clear;
    constructor() {}
  }
  export class SelectBuyer implements ActionWithPayload {
    readonly type: string = ActionTypes.SelectBuyer;
    constructor(public payload: string) {}
  }

  export class SelectUser implements ActionWithPayload {
    readonly type: string = ActionTypes.SelectUser;
    constructor(public payload: string) {}
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
    | AddAll
    | AddMany
    | UpsertMany
    | UpsertOne
    | Clear;
}
