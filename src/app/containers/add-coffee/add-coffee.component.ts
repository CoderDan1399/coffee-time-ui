import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from '../../redux/models/user.model';
import { UserSelectors } from '../../redux/selectors/user.selectors';
import { UsersSelectedActions } from '../../redux/actions/users-selected.actions';
import { Dictionary } from '@ngrx/entity/src/models';
import { Id } from '../../redux/models/id.model';
import { UsersSelectedSelectors } from '../../redux/selectors/users-selected.selectors';
import { tap } from 'rxjs/operators';
import { TransactionActions } from '../../redux/actions/transaction.actions';

@Component({
  selector: 'app-add-coffee',
  templateUrl: './add-coffee.component.html',
  styleUrls: ['./add-coffee.component.scss'],
})
export class AddCoffeeComponent implements OnInit {
  public users$: Observable<User[]>;
  public currentUser$: Observable<User>;
  public selectedUsers$: Observable<Dictionary<Id>> = of({});
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.users$ = this.store.select(
      UserSelectors.getUsersForTeamSortedByCurrentUser
    );

    this.selectedUsers$ = this.store
      .select(
        UsersSelectedSelectors.getUsersSelectedCommonSelectors.selectEntities
      )
      .pipe(tap(val => console.log(val)));
  }
  public userClickHandler(user: User) {
    this.store.dispatch(new UsersSelectedActions.SelectUser(user.id));
  }

  public saveHandler() {
    this.store.dispatch(new TransactionActions.Save(<any>{}));
  }
}
