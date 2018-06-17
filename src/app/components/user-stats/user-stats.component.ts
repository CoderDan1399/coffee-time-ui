import { Component, Input, OnInit } from '@angular/core';
import { User, UserStats } from '../../redux/models/user.model';
import { Dictionary } from '../../redux/models/dictionary.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss'],
})
export class UserStatsComponent implements OnInit {
  @Input() users: User[];
  @Input() userStats: Dictionary<UserStats> = {};
  constructor() {}
  ngOnInit() {}

  getStats(userId: string) {
    return this.userStats[userId] || { consumed: 0, purchased: 0 };
  }
}
