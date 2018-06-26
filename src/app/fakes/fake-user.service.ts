import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FakeDataService } from './fake-data.service';
import { switchMap, tap, delay } from 'rxjs/operators';
import { IUserService } from '../services/user.service';
import { UserModels } from '../redux/models/user.model';

const USERS_KEY = 'USERS';
const DELAY = 500;
@Injectable()
export class FakeUserService implements IUserService {
  getUser(userId: string): Observable<UserModels.User> {
    return of(null).pipe(
      delay(DELAY),
      switchMap(() => {
        const user = this.data.getFromArray<UserModels.User>(
          USERS_KEY,
          item => item.id === userId
        )[0];
        return of(user);
      })
    );
  }

  verifyUser(userId: string, secret: string): Observable<UserModels.User> {
    return of(null).pipe(
      delay(DELAY),
      switchMap(() => {
        return of(
          this.data.getFromArray<UserModels.User>(
            USERS_KEY,
            user => user.id === userId && user.secret === secret
          )[0]
        );
      })
    );
  }

  constructor(private data: FakeDataService) {}
  addUser(user: UserModels.User): Observable<any> {
    return of(null).pipe(
      delay(DELAY),
      tap(() => this.data.addToArray(USERS_KEY, user))
    );
  }

  updateUser(user: UserModels.User): Observable<any> {
    return this.removeUser(user.id).pipe(switchMap(() => this.addUser(user)));
  }

  removeUser(userId: string): Observable<any> {
    return of(null).pipe(
      delay(DELAY),
      tap(() => {
        this.data.removeFromArray(USERS_KEY, item => item.id === userId);
      })
    );
  }

  getUsersForTeam(teamId: string): Observable<UserModels.User[]> {
    return of(
      this.data.getFromArray<UserModels.User>(
        USERS_KEY,
        item => item.teamId === teamId
      )
    ).pipe(delay(DELAY));
  }
}
