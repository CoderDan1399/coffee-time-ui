import { Injectable } from '@angular/core';
import { ITeamService } from '../services/team.service';
import { Team } from '../redux/models/team.model';
import { Observable, of } from 'rxjs';
import { FakeDataService } from './fake-data.service';
import { tap, switchMap, map } from 'rxjs/operators';

const TEAMS_KEY = 'TEAMS';

@Injectable()
export class FakeTeamService implements ITeamService {
  verifySecret(teamId: string, secret: string): Observable<boolean> {
    console.log('verifying', { teamId, secret });
    return this.getTeam(teamId).pipe(
      map(team => team && team['removedSecret'] === secret)
    );
  }
  constructor(private data: FakeDataService) {}

  addTeam(team: Team): Observable<any> {
    return of(null).pipe(tap(() => this.data.addToArray(TEAMS_KEY, team)));
  }

  updateTeam(team: Team): Observable<any> {
    return this.removeTeam(team.id).pipe(switchMap(() => this.addTeam(team)));
  }

  removeTeam(teamId: string): Observable<any> {
    return of(null).pipe(
      tap(() => {
        this.data.removeFromArray(TEAMS_KEY, item => item.id === teamId);
      })
    );
  }
  getTeam(id: string): Observable<Team> {
    return of(
      this.data.getFromArray<Team>(TEAMS_KEY, item => item.id === id)[0]
    ).pipe(
      // Remove secret
      map(
        val =>
          val ? { ...val, removedSecret: val.secret, secret: undefined } : val
      )
    );
  }
}
