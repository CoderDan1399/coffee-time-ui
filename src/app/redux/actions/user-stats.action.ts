import { ActionWithPayload } from './common';
import { UserModels } from '../models/user.model';
import { TransactionModels } from '../models/transaction.model';

export namespace UserStatsActions {
  type EntityType = UserModels.UserStats;
  export enum ActionTypes {
    AddOne = '[user stats] add one',
    AddAll = '[user stats] add all',
    AddMany = '[user stats] add many',
    UpdateOne = '[user stats] update one',
    RemoveOne = '[user stats] remove one',
    UpsertOne = '[user stats] upsert one',
    UpsertMany = '[user stats] upsert many',
    AddTransaction = '[user stats] add transaction',
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

  export class AddTransaction implements ActionWithPayload {
    readonly type: string = ActionTypes.AddTransaction;
    constructor(public payload: TransactionModels.Transaction) {}
  }

  export type ActionsUnion =
    | AddOne
    | RemoveOne
    | UpdateOne
    | AddAll
    | AddMany
    | UpsertMany
    | UpsertOne
    | AddTransaction;
}
