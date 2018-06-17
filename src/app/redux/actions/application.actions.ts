import { ApplicationModels } from '../models/application.model';
import { ActionWithPayload } from './common';

export namespace ApplicationActions {
  export enum ActionTypes {
    update = '[application] update',
  }

  export class Update implements ActionWithPayload {
    readonly type = ActionTypes.update;
    constructor(public payload: Partial<ApplicationModels.Application>) {}
  }
}
