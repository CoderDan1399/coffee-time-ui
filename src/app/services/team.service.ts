import { Team } from '../redux/models/team.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../redux/models/transaction.model';

@Injectable()
export class TeamService implements ITeamService {
  verifySecret(teamId: string, secret: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  addTeam(team: Team): Observable<any> {
    return of(null);
  }
  updateTeam(team: Team): Observable<any> {
    return of(null);
  }

  getTeam(id: string): Observable<Team> {
    return of(null);
  }

  addCoffee(transaction: Transaction, userSecret: string): Observable<null> {
    return undefined;
  }
}

export interface ITeamService {
  addTeam(team: Team): Observable<any>;

  updateTeam(team: Team): Observable<any>;

  getTeam(id: string): Observable<Team>;

  verifySecret(teamId: string, secret: string): Observable<boolean>;
}
