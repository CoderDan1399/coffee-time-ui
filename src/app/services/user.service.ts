import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDetails, User } from '../redux/models/user.model';

@Injectable()
export class UserService implements IUserService {
  getUsersForTeam(teamId: string): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
  addUser(user: UserDetails): Observable<any> {
    return of(null);
  }
  updateUser(user: UserDetails): Observable<any> {
    return of(null);
  }
  removeUser(userId: string): Observable<any> {
    return of(null);
  }
}

export interface IUserService {
  addUser(user: UserDetails): Observable<any>;
  updateUser(user: UserDetails): Observable<any>;
  removeUser(userId: string): Observable<any>;

  getUsersForTeam(teamId: string): Observable<User[]>;
}