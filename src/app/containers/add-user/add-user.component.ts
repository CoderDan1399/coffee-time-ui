import { Component, OnInit, OnDestroy } from '@angular/core';
import { newId } from '../../common/new-id';
import { Store } from '@ngrx/store';
import { UserActions } from '../../redux/actions/user.actions';
import { ActivatedRoute } from '@angular/router';
import {
  filter,
  first,
  tap,
  map,
  distinctUntilChanged,
  take,
  takeUntil,
} from 'rxjs/operators';
import { Observable, Subscription, Subject } from 'rxjs';
import { UserSelectors } from '../../redux/selectors/user.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: 'add-user.component.html',
})
export class AddUserComponent implements OnInit, OnDestroy {
  public name: string;
  public initials: string;
  public id = newId();
  public secret = newId();
  private savingSubscription: Subscription;
  private destroy$ = new Subject();

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public onAdd() {
    if (this.savingSubscription) {
      this.savingSubscription.unsubscribe();
    }

    this.route.params
      .pipe(
        filter(params => params && params.teamId),
        first()
      )
      .subscribe(params => {
        this.store.dispatch(
          new UserActions.Save({
            id: this.id,
            initials: this.initials,
            name: this.name,
            teamId: params.teamId,
            secret: this.secret,
          })
        );

        this.savingSubscription = this.store
          .select(UserSelectors.getHasSavedSelector)
          .pipe(
            takeUntil(this.destroy$),
            filter(Boolean),
            take(1),
            tap(() =>
              this.router.navigate(['../../'], { relativeTo: this.route })
            )
          )
          .subscribe();
      });
  }
}
