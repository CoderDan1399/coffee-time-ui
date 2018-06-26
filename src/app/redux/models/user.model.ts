export namespace UserModels {
  export interface User {
    id: string;
    teamId: string;
    name: string;
    initials: string;
    secret: string;
  }

  export interface UserStats {
    id: string;
    teamId: string;
    purchased: number;
    consumed: number;
  }

  export interface UserCredentials {
    userId: string;
    teamId: string;
    userSecret: string;
  }
}
