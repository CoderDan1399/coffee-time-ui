import { Component, OnInit, Input } from '@angular/core';
import { UserModels } from '../../redux/models/user.model';
import { Dictionary } from 'ramda';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: 'transaction-summary.component.html',
})
export class TransactionSummaryComponent implements OnInit {
  @Input() public buyer: UserModels.User;
  @Input() public receivers: UserModels.User[];
  @Input() public userStats: Dictionary<UserModels.UserStats>;
  constructor() {}

  ngOnInit() {}
}
