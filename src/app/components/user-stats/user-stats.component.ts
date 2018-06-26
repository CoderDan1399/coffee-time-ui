import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from '../../redux/models/dictionary.model';
import { UserModels } from '../../redux/models/user.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss'],
})
export class UserStatsComponent implements OnInit {
  @Input() users: UserModels.User[];
  @Input() userStats: Dictionary<UserModels.UserStats> = {};
  constructor() {}
  ngOnInit() {}

  getStats(userId: string) {
    return this.userStats[userId] || { consumed: 0, purchased: 0 };
  }
}
