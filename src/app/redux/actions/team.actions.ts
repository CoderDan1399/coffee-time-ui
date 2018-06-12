import { Action } from '@ngrx/store';
import { Team as EntityType } from '../models/team.model';
import { createEntityAdapter } from '@ngrx/entity';
import { ActionWithPayload } from './common';

export namespace TeamActions {
  export enum ActionTypes {
    AddOne = '[team] add one',
    AddAll = '[team] add all',
    AddMany = '[team] add many',
    UpdateOne = '[team] update one',
    RemoveOne = '[team] remove one',
    UpsertOne = '[team] upsert one',
    Save = '[team] save',
    SaveSuccess = '[team] save success',
    SaveFail = '[team] save fail',
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
