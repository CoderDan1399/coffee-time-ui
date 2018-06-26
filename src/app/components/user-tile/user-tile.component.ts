import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModels } from '../../redux/models/user.model';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss'],
})
export class UserTileComponent implements OnInit {
  @Input() public user: UserModels.User;
  @Input() public selected: boolean;
  @Output() public selectUser = new EventEmitter<UserModels.User>();
  constructor() {}

  public clickHander() {
    this.selectUser.emit(this.user);
  }

  ngOnInit() {}
}
