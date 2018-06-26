import { ActionWithPayload } from './common';
import { SavingStatusModels } from '../models/saving-status.models';

export namespace SavingStatusActions {
  type EntityType = SavingStatusModels.SavingStatus;

  export enum ActionTypes {
    AddOne = '[saving status] add one',
    AddAll = '[saving status] add all',
    AddMany = '[saving status] add many',
    UpdateOne = '[saving status] update one',
    RemoveOne = '[saving status] remove one',
    UpsertOne = '[saving status] upsert one',
    UpsertMany = '[saving status] upsert many',
    Save = '[saving status] save',
    SaveSuccess = '[saving status] save success',
    SaveFail = '[saving status] save fail',
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
    constructor(public payload: string) {}
  }

  export class SaveSuccess implements ActionWithPayload {
    readonly type: string = ActionTypes.SaveSuccess;
    constructor(public payload: string) {}
  }

  export class SaveFail implements ActionWithPayload {
    readonly type: string = ActionTypes.SaveFail;
    constructor(
      public payload: { id: string; error: string; errorObject: any }
    ) {}
  }

  export type ActionsUnion =
    | AddOne
    | Save
    | SaveSuccess
    | SaveFail
    | AddAll
    | RemoveOne
    | UpdateOne
    | AddMany
    | UpsertMany
    | UpsertOne;
}
