import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { TeamActions } from '../../redux/actions/team.actions';
import { newId } from '../../common/new-id';
import { getCurrentUrl } from '../../common/window-utils';
import { Router, ActivatedRoute } from '@angular/router';
import { first, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RouterSelectors } from '../../redux/selectors/router.selectors';
import { UserSelectors } from '../../redux/selectors/user.selectors';
import { Team } from '../../redux/models/team.model';
import { TeamSelectors } from '../../redux/selectors/team.selectors';
import { curry } from 'ramda';
import { UserModels } from '../../redux/models/user.model';

@Component({
  selector: 'manage-team',
  templateUrl: './manage-team.component.html',
})
export class ManageTeamComponent implements OnInit {
  public team$: Observable<Team>;
  public teamName: string;
  public users$: Observable<UserModels.User[]>;
  get currentUrl() {
    return getCurrentUrl();
  }

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.team$ = this.store.select(TeamSelectors.getCurrentTeamSelector).pipe(
      tap(val => console.log('team', val)),
      filter(Boolean)
    );
    let userSelector = createSelector(
      RouterSelectors.getTeamIdSelector,
      UserSelectors.commonSelectors.selectAll,
      (teamId, users) => {
        console.log({ teamId, users });
        return users.filter(user => user.teamId === teamId);
      }
    );
    this.users$ = this.store
      .select(userSelector)
      .pipe(tap(val => console.log(val)));
  }
  public onSubmit(event) {}
  public addUser() {
    console.log('huh', this.router.routerState);
    this.route.params
      .pipe(
        first(),
        tap(p => {
          this.router.navigate(['user/add'], { relativeTo: this.route });
        })
      )
      .subscribe();
  }
}
