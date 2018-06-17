import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FakeDataService } from './fake-data.service';
import { switchMap, tap } from 'rxjs/operators';
import { IUserService } from '../services/user.service';
import { User } from '../redux/models/user.model';

const USERS_KEY = 'USERS';
@Injectable()
export class FakeUserService implements IUserService {
  getUser(userId: string): Observable<User> {
    const user = this.data.getFromArray<User>(
      USERS_KEY,
      item => item.id === userId
    )[0];
    return of(user);
  }

  verifyUser(userId: string, secret: string): User {
    return this.data.getFromArray<User>(
      USERS_KEY,
      user => user.id === userId && user.secret === secret
    )[0];
  }

  constructor(private data: FakeDataService) {}
  addUser(user: User): Observable<any> {
    return of(null).pipe(tap(() => this.data.addToArray(USERS_KEY, user)));
  }

  updateUser(user: User): Observable<any> {
    return this.removeUser(user.id).pipe(switchMap(() => this.addUser(user)));
  }

  removeUser(userId: string): Observable<any> {
    return of(null).pipe(
      tap(() => {
        this.data.removeFromArray(USERS_KEY, item => item.id === userId);
      })
    );
  }

  getUsersForTeam(teamId: string): Observable<User[]> {
    return of(
      this.data.getFromArray(USERS_KEY, item => item.teamId === teamId)
    );
  }
}
