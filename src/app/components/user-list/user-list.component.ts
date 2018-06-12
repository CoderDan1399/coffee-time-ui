import { Component } from '@angular/core';
import { User } from '../../redux/models/user.model';
import { Input } from '@angular/core';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() public users: User[];
}
