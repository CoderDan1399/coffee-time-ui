import { Team } from '../redux/models/team.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TeamService implements ITeamService {
  addTeam(team: Team): Observable<any> {
    return of(null);
  }
  updateTeam(team: Team): Observable<any> {
    return of(null);
  }

  getTeam(id: string): Observable<Team> {
    return of(null);
  }
}

export interface ITeamService {
  addTeam(team: Team): Observable<any>;

  updateTeam(team: Team): Observable<any>;

  getTeam(id: string): Observable<Team>;
}
