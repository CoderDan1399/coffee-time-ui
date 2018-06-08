import { Injectable } from '@angular/core';
import { ITeamService } from '../services/team.service';
import { Team } from '../redux/models/team.model';
import { Observable, of } from 'rxjs';
import { FakeDataService } from './fake-data.service';
import { tap, switchMap } from 'rxjs/operators';
import { IUserService } from '../services/user.service';
import { UserDetails, User } from '../redux/models/user.model';

const USERS_KEY = 'USERS';
@Injectable()
export class FakeUserService implements IUserService {
  constructor(private data: FakeDataService) {}
  addUser(user: UserDetails): Observable<any> {
    return of(null).pipe(tap(() => this.data.addToArray(USERS_KEY, user)));
  }
  updateUser(user: UserDetails): Observable<any> {
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
