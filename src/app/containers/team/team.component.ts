import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../redux/models/team.model';
import { Store } from '@ngrx/store';
import { TeamSelectors } from '../../redux/selectors/team.selectors';
import { UserSelectors } from '../../redux/selectors/user.selectors';
import { Dictionary } from '../../redux/models/dictionary.model';
import { UserStatsSelectors } from '../../redux/selectors/user-stats.selectors';
import { UserModels } from '../../redux/models/user.model';

@Component({
  selector: 'app-team',
  templateUrl: 'team.component.html',
})
export class TeamComponent implements OnInit {
  public team$: Observable<Team>;
  public user$: Observable<UserModels.User>;
  public userStats$: Observable<Dictionary<UserModels.UserStats>>;
  public allUsers$: Observable<UserModels.User[]>;
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.team$ = this.store.select(TeamSelectors.getCurrentTeamSelector);
    this.user$ = this.store.select(UserSelectors.getCurrentUser);
    this.allUsers$ = this.store.select(UserSelectors.getUsersForTeamSelector);
    this.userStats$ = this.store.select(
      UserStatsSelectors.getUserStatsSelector
    );
  }
}
