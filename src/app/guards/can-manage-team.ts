import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamService } from '../services/team.service';
import { tap } from 'rxjs/operators';
import { getCurrentUrl } from '../common/window-utils';

@Injectable()
export class CanActivateMangeTeam implements CanActivate {
  constructor(private teamService: TeamService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log({ route, state });
    return this.teamService
      .verifySecret(route.params['teamId'], route.params['secret'])
      .pipe(
        tap(result => {
          if (result === false) {
            this.router.navigate(['not-authorized']);
          }
        })
      );
  }
}
