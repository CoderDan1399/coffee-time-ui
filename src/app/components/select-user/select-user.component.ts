import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Id } from '../../redux/models/id.model';
import { Dictionary } from '../../redux/models/dictionary.model';
import { UserModels } from '../../redux/models/user.model';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent implements OnInit {
  @Input() users: UserModels.User[];
  @Input() selectedUsers: Dictionary<Id>;
  @Output() userSelected = new EventEmitter<UserModels.User>();
  constructor() {}

  ngOnInit() {}

  userClickHandler(user) {
    this.userSelected.emit(user);
  }
}
