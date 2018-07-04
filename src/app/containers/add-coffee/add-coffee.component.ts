import { Component, OnDestroy, OnInit } from '@angular/core';
import { createSelector, Store, MemoizedSelector } from '@ngrx/store';
import { Observable, of, Subject, ReplaySubject } from 'rxjs';
import { UserModels } from '../../redux/models/user.model';
import { UserSelectors } from '../../redux/selectors/user.selectors';
import { UsersSelectedActions } from '../../redux/actions/users-selected.actions';
import { Dictionary } from '@ngrx/entity/src/models';
import { Id } from '../../redux/models/id.model';
import { UsersSelectedSelectors } from '../../redux/selectors/users-selected.selectors';
import { filter, first, takeUntil, tap } from 'rxjs/operators';
import { TeamSelectors } from '../../redux/selectors/team.selectors';

import { newId } from '../../common/new-id';
import { anyNil } from '../../common/common';
import { ActionDispatchers } from '../../redux/dispatchers/action.dispatchers';
import { TransactionModels } from '../../redux/models/transaction.model';
import { UserStatsSelectors } from '../../redux/selectors/user-stats.selectors';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-coffee',
  templateUrl: './add-coffee.component.html',
  styleUrls: ['./add-coffee.component.scss'],
})
export class AddCoffeeComponent implements OnInit, OnDestroy {
  public userStats$: Observable<Dictionary<UserModels.UserStats>>;
  public users$: Observable<UserModels.User[]>;
  public buyerUserId$: Observable<string>;
  public buyer$: Observable<UserModels.User>;
  public selectedUsers$: Observable<UserModels.User[]>;
  public selectedUserIds$: Observable<Dictionary<Id>> = of({});
  public confirm = false;
  private destroy$ = new Subject();
  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buyer$ = this.store.select(buyerSelector);
    this.selectedUsers$ = getSelectedUsers(this.store);
    this.userStats$ = this.store.select(
      UserStatsSelectors.getUserStatsSelector
    );
    getSelectedUsers(this.store).subscribe(vals => console.log(vals));

    this.users$ = this.store.select(
      UserSelectors.getUsersForTeamSortedByCurrentUser
    );

    this.buyerUserId$ = this.store.select(
      UsersSelectedSelectors.getBuyerUserIdSelector
    );
    this.users$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        first()
      )
      .subscribe(users => {
        this.setBuyer(users[0].id);
      });

    this.selectedUserIds$ = this.store.select(
      UsersSelectedSelectors.commonSelectors.selectEntities
    );
  }
  trackByUser(index, item) {
    return item.id;
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
  public userClickHandler(user: UserModels.User) {
    this.store.dispatch(new UsersSelectedActions.SelectUser(user.id));
  }

  setBuyer(userId: string) {
    this.store.dispatch(new UsersSelectedActions.SelectBuyer(userId));
  }
  public gotoConfirmTransaction() {
    this.confirm = true;
  }

  public gotoTransaction() {
    this.confirm = false;
  }
  public saveHandler() {
    const selector = createSelector(
      getTransactionSelectorFactory(newId()),
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
          transaction: TransactionModels.Transaction;
          credentials: UserModels.UserCredentials;
        }) => {
          ActionDispatchers.dispatchSaveTransaction(
            this.store,
            transaction,
            credentials.userId,
            credentials.userSecret
          );
          ActionDispatchers.waitForSave(this.store, transaction.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(status => {
              if (status.hasSaved) {
                this.store.dispatch(new UsersSelectedActions.Clear());
                this.router.navigate(['../'], {
                  relativeTo: this.route,
                  preserveQueryParams: true,
                });
              }
            });
        }
      );
  }
  public buyerSelectedHandler(userId: string) {
    this.setBuyer(userId);
  }
}

export function getTransactionSelectorFactory(
  transactionId: string
): MemoizedSelector<any, TransactionModels.Transaction> {
  return createSelector(
    UsersSelectedSelectors.commonSelectors.selectEntities,
    UsersSelectedSelectors.getBuyerUserIdSelector,
    TeamSelectors.getCurrentTeamSelector,
    UserSelectors.getCurrentUser,
    UserSelectors.getUsersForTeamSelector,
    (selectedUsers, buyerUserId, currentTeam, currentUser, users) => {
      if (anyNil(selectedUsers, buyerUserId, currentTeam, currentUser, users)) {
        return undefined;
      }
      const purchaser = users[buyerUserId];

      const transactionHeader: TransactionModels.Transaction = {
        teamId: currentTeam.id,
        addedByUserId: currentUser.id,
        addedByUserName: currentUser.name,
        datePurchased: new Date(),
        id: newId(),
        items: [],
        purchaserName: purchaser.name,
        purchaserUserId: purchaser.id,
      };

      const transactionItems = <TransactionModels.TransactionItem[]>(
        Object.values(users)
          .filter(user => selectedUsers[user.id])
          .map(
            user =>
              <TransactionModels.TransactionItem>{
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

export const buyerSelector = createSelector(
  UsersSelectedSelectors.getBuyerUserIdSelector,
  UserSelectors.getUsersForTeamSelector,
  (buyerId, users) => {
    return users[buyerId];
  }
);

export function getSelectedUsers(
  store: Store<any>
): Observable<UserModels.User[]> {
  const selector = createSelector(
    UsersSelectedSelectors.commonSelectors.selectEntities,
    UserSelectors.getUsersForTeamSelector,
    (selectedUserIds, users) => {
      return Object.values(users).filter(user => selectedUserIds[user.id]);
    }
  );

  return store.select(selector);
}
