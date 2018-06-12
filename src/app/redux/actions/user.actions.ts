import { Action } from '@ngrx/store';
import { User as EntityType } from '../models/user.model';
import { createEntityAdapter } from '@ngrx/entity';
import { ActionWithPayload } from './common';

export namespace UserActions {
  export enum ActionTypes {
    AddOne = '[user] add one',
    AddAll = '[user] add all',
    AddMany = '[user] add many',
    UpdateOne = '[user] update one',
    RemoveOne = '[user] remove one',
    UpsertOne = '[user] upsert one',
    Save = '[user] save',
    SaveSuccess = '[user] save success',
    SaveFail = '[user] save fail',
  }
  export class AddOne implements ActionWithPayload {
    readonly type: string = ActionTypes.AddOne;
    constructor(public payload: EntityType) {}
  }

  export class AddAll implements ActionWithPayload {
    readonly type: string = ActionTypes.AddAll;
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
    | AddAll
    | AddMany;
}
