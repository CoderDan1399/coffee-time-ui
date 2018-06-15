import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../redux/actions/team.actions';
import { newId } from '../../common/new-id';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Team } from '../../redux/models/team.model';
import { TeamSelectors } from '../../redux/selectors/team.selectors';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
})
export class CreateTeamComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject();
  public teamName: string;
  private id = newId();
  private secret = newId();

  constructor(private store: Store<any>, private router: Router) {}
  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
  ngOnInit(): void {
    this.store
      .select(TeamSelectors.getHasSavedSelector)
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap(() =>
          this.router.navigate(['/team', this.id, 'manage', this.secret])
        )
      )
      .subscribe();
  }
  public onSubmit() {
    const team: Team = {
      id: this.id,
      name: this.teamName,
      secret: this.secret,
    };
    this.store.dispatch(new TeamActions.UpsertOne(team));

    this.store.dispatch(new TeamActions.Save(team));
  }
}
