export interface User {
  id: string;
  teamId: string;
  name: string;
  initials: string;
  secret: string;
}

export interface UserStats {
  userId: string;
  purchased: number;
  consumed: number;
  refresh: boolean;
}
