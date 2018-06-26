import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModels } from '../redux/models/user.model';

@Injectable()
export class UserService implements IUserService {
  getUsersForTeam(teamId: string): Observable<UserModels.User[]> {
    throw new Error('Method not implemented.');
  }
  addUser(user: UserModels.User): Observable<any> {
    return of(null);
  }

  getUser(userId: string): Observable<UserModels.User> {
    return of(null);
  }

  updateUser(user: UserModels.User): Observable<any> {
    return of(null);
  }
  removeUser(userId: string): Observable<any> {
    return of(null);
  }

  verifyUser(userId: string, secret: string): Observable<UserModels.User> {
    return undefined;
  }
}

export interface IUserService {
  getUser(userId: string): Observable<UserModels.User>;
  addUser(user: UserModels.User): Observable<any>;
  updateUser(user: UserModels.User): Observable<any>;
  removeUser(userId: string): Observable<any>;

  getUsersForTeam(teamId: string): Observable<UserModels.User[]>;

  verifyUser(userId: string, secret: string): Observable<UserModels.User>;
}
