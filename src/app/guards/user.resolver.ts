import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ApplicationActions } from '../redux/actions/application.actions';
import { UserService } from '../services/user.service';
import { UserActions } from '../redux/actions/user.actions';
import { User } from '../redux/models/user.model';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private store: Store<any>,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Observable<User> | Promise<User> {
    return this.userService.getUser(route.params['id']).pipe(
      tap(user => {
        if (user) {
          this.store.dispatch(new UserActions.UpsertOne(user));
          this.store.dispatch(
            new ApplicationActions.Update({ currentUser: user.id })
          );
        } else {
          this.router.navigate(['not-found']);
        }
      })
    );
  }
}
