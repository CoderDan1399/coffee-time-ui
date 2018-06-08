export interface UserDetails {
  id: string;
  teamId: string;
  name: string;
  initials: string;
  secret: string;
}
export interface User extends UserDetails, UserTransactionDetails {}

export interface UserTransactionDetails {
  purchased: number;
  consumed: number;
  lastTransactionId: number;
}
