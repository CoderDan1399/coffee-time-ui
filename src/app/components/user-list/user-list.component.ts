import { Component } from '@angular/core';
import { User } from '../../redux/models/user.model';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  public users: User[];
}
