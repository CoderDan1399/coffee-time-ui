import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../redux/models/user.model';

@Injectable()
export class UserService implements IUserService {
  getUsersForTeam(teamId: string): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
  addUser(user: User): Observable<any> {
    return of(null);
  }

  getUser(userId: string): Observable<User> {
    return of(null);
  }

  updateUser(user: User): Observable<any> {
    return of(null);
  }
  removeUser(userId: string): Observable<any> {
    return of(null);
  }

  verifyUser(userId: string, secret: string): User {
    return undefined;
  }
}

export interface IUserService {
  getUser(userId: string): Observable<User>;
  addUser(user: User): Observable<any>;
  updateUser(user: User): Observable<any>;
  removeUser(userId: string): Observable<any>;

  getUsersForTeam(teamId: string): Observable<User[]>;

  verifyUser(userId: string, secret: string): User;
}
