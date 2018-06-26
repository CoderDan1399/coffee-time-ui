import { Team as EntityType } from '../models/team.model';
import { ActionWithPayload } from './common';
import { TransactionModels } from '../models/transaction.model';

export namespace TransactionActions {
  export enum ActionTypes {
    AddOne = '[transaction] add one',
    AddAll = '[transaction] add all',
    AddMany = '[transaction] add many',
    UpdateOne = '[transaction] update one',
    RemoveOne = '[transaction] remove one',
    UpsertOne = '[transaction] upsert one',
    UpsertMany = '[transaction] upsert many',
    Save = '[transaction] save',
    SaveSuccess = '[transaction] save success',
    SaveFail = '[transaction] save fail',
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
    constructor(
      public payload: {
        transaction: TransactionModels.Transaction;
        userId: string;
        userSecret: string;
      }
    ) {}
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
    | AddMany
    | UpsertMany
    | UpsertOne;
}
