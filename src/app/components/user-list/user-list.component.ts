import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { UserModels } from '../../redux/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() public users: UserModels.User[];
  public selectAll(event) {
    event.srcElement.select();
  }
  constructor(private location: Location) {}

  public getUserUrl(user: UserModels.User) {
    const url = this.location.prepareExternalUrl(
      `/team/${user.teamId}/${user.id}?userSecret=${user.secret}`
    );
    return `${window.location.protocol}//${window.location.hostname}:${
      window.location.port
    }${url}`;
  }
}
