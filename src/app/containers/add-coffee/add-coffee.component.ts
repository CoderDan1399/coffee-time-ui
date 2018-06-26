import { Component, OnDestroy, OnInit } from '@angular/core';
import { createSelector, Store, MemoizedSelector } from '@ngrx/store';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { UserModels } from '../../redux/models/user.model';
import { UserSelectors } from '../../redux/selectors/user.selectors';
import { UsersSelectedActions } from '../../redux/actions/users-selected.actions';
import { Dictionary } from '@ngrx/entity/src/models';
import { Id } from '../../redux/models/id.model';
import { UsersSelectedSelectors } from '../../redux/selectors/users-selected.selectors';
import { filter, first, takeUntil, tap } from 'rxjs/operators';
import { TransactionActions } from '../../redux/actions/transaction.actions';
import { TeamSelectors } from '../../redux/selectors/team.selectors';
import {
  Transaction,
  TransactionItem,
} from '../../redux/models/transaction.model';
import { newId } from '../../common/new-id';
import { isNil } from 'ramda';
import { anyNil } from '../../common/common';
import { ActionDispatchers } from '../../redux/dispatchers/action.dispatchers';

@Component({
  selector: 'app-add-coffee',
  templateUrl: './add-coffee.component.html',
  styleUrls: ['./add-coffee.component.scss'],
})
export class AddCoffeeComponent implements OnInit, OnDestroy {
  public users$: Observable<UserModels.User[]>;
  public buyerUserId: string;
  public selectedUsers$: Observable<Dictionary<Id>> = of({});
  private destroy$ = new Subject();
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.users$ = this.store.select(
      UserSelectors.getUsersForTeamSortedByCurrentUser
    );

    this.users$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        first()
      )
      .subscribe(users => {
        this.buyerUserId = users[0].id;
      });

    this.selectedUsers$ = this.store
      .select(
        UsersSelectedSelectors.getUsersSelectedCommonSelectors.selectEntities
      )
      .pipe(tap(val => console.log(val)));
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
  public userClickHandler(user: UserModels.User) {
    this.store.dispatch(new UsersSelectedActions.SelectUser(user.id));
  }

  public saveHandler() {
    const selector = createSelector(
      getTransactionSelectorFactory(newId(), this.buyerUserId),
      UserSelectors.getUserCredentialsSelector,
      (transaction, credentials) => {
        return transaction && credentials
          ? { transaction, credentials }
          : undefined;
      }
    );
    this.store
      .select(selector)
      .pipe(
        filter(Boolean),
        first(),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ({
          transaction,
          credentials,
        }: {
          transaction: Transaction;
          credentials: UserModels.UserCredentials;
        }) => {
          console.log(transaction);
          console.log(credentials);
          const actions = ActionDispatchers.createSaveTransactionActions(
            transaction,
            credentials.userId,
            credentials.userSecret
          );

          console.log(actions);
          actions.forEach(action => this.store.dispatch(action));
        }
      );
  }
  public buyerSelectedHandler(user) {}
}

export function getTransactionSelectorFactory(
  transactionId: string,
  purchaserUserId: string
): MemoizedSelector<any, Transaction> {
  return createSelector(
    UsersSelectedSelectors.getUsersSelectedCommonSelectors.selectEntities,
    TeamSelectors.getCurrentTeamSelector,
    UserSelectors.getCurrentUser,
    UserSelectors.getUsersForTeamSelector,
    (selectedUsers, currentTeam, currentUser, users) => {
      if (anyNil(selectedUsers, currentTeam, currentUser, users)) {
        return undefined;
      }
      const purchaser = users.find(user => user.id === purchaserUserId);

      const transactionHeader: Transaction = {
        teamId: currentTeam.id,
        addedByUserId: currentUser.id,
        addedByUserName: currentUser.name,
        datePurchased: new Date(),
        id: newId(),
        items: [],
        purchaserName: purchaser.name,
        purchaserUserId: purchaser.id,
      };

      const transactionItems = <TransactionItem[]>(
        users.filter(user => selectedUsers[user.id]).map(
          user =>
            <TransactionItem>{
              userId: user.id,
              qty: 1,
              id: newId(),
              transactionId,
              username: user.name,
            }
        )
      );
      transactionHeader.items = transactionItems;
      return transactionHeader;
    }
  );
}
