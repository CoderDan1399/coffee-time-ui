export interface Team {
  name: string;
  id: string;
  secret: string;
}

export interface TeamToUsers {
  userIds: string[];
}
