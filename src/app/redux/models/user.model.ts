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
