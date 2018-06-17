import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../redux/models/user.model';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss'],
})
export class UserTileComponent implements OnInit {
  @Input() public user: User;
  @Input() public selected: boolean;
  @Output() public click = new EventEmitter<User>();
  constructor() {}

  public clickHander() {
    this.click.emit(this.user);
  }

  ngOnInit() {}
}
