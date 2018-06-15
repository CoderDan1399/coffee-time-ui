import { Component } from '@angular/core';
import { User } from '../../redux/models/user.model';
import { Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() public users: User[];
  public selectAll(event) {
    event.srcElement.select();
  }
  constructor(private location: Location) {}

  public getUserUrl(user: User) {
    const url = this.location.prepareExternalUrl(
      `/team/${user.teamId}/${user.id}?secret=${user.secret}`
    );
    return `${window.location.protocol}//${window.location.hostname}:${
      window.location.port
    }${url}`;
  }
}
