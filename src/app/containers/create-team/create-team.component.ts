import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../redux/actions/team.actions';
import { newId } from '../../common/new-id';
import { Router } from '@angular/router';
import { Subject, Observable, Subscribable, Subscription } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Team } from '../../redux/models/team.model';
import { TeamSelectors } from '../../redux/selectors/team.selectors';
import { SavingStatusModels } from '../../redux/models/saving-status.models';
import { SavingStatusSelectors } from '../../redux/selectors/saving-status.selectors';
import { SavingStatusActions } from '../../redux/actions/saving-status.actions';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
})
export class CreateTeamComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject();
  public teamName: string;
  private id = newId();
  private secret = newId();
  private savingRedirectSubscription: Subscription;

  constructor(private store: Store<any>, private router: Router) {}
  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  ngOnInit(): void {}
  public onSubmit() {
    if (this.savingRedirectSubscription) {
      this.savingRedirectSubscription.unsubscribe();
    }

    const key = SavingStatusModels.createKey(
      SavingStatusModels.SAVING_TEAM_KEY,
      this.id
    );
    const selector = SavingStatusSelectors.getSavingStatusSelectorFactory(key);
    const team: Team = {
      id: this.id,
      name: this.teamName,
      secret: this.secret,
    };

    this.store.dispatch(new TeamActions.Save(team));
    this.store.dispatch(new SavingStatusActions.Save(key));

    this.savingRedirectSubscription = this.store
      .select(selector)
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        filter(status => status.hasSaved),
        tap(() =>
          this.router.navigate(['/team', this.id, 'manage', this.secret])
        )
      )
      .subscribe();
  }
}
