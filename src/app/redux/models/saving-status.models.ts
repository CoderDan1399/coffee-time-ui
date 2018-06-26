export namespace SavingStatusModels {
  export interface SavingStatus {
    id: string;
    saving: boolean;
    hasSaved: boolean;
    error: string;
    errorObject: any;
  }

  export function createKey(prefix: string, id: string) {
    return prefix + '#' + id;
  }

  export const SAVING_TRANSACTION_KEY = 'SAVING_TRANSACTION_KEY';
  export const SAVING_USER_KEY = 'SAVING_USER_KEY';
  export const SAVING_TEAM_KEY = 'SAVING_TEAM_KEY';

  export function hasSavedStatus(id: string): SavingStatus {
    return {
      id,
      saving: false,
      hasSaved: true,
      error: null,
      errorObject: null,
    };
  }

  export function saveFailStatus(
    id: string,
    error: string,
    errorObject: any
  ): SavingStatus {
    return {
      id,
      saving: false,
      hasSaved: false,
      error,
      errorObject,
    };
  }
  export function savingStatus(id: string): SavingStatus {
    return {
      id,
      saving: true,
      hasSaved: false,
      error: null,
      errorObject: null,
    };
  }
}
