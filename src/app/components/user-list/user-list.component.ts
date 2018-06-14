import { Component } from '@angular/core';
import { User } from '../../redux/models/user.model';
import { Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() public users: User[];
  constructor(private location: Location) {}

  public getUserUrl(user: User) {
    const url = this.location.prepareExternalUrl(
      `/team/${user.teamId}/${user.id}?secret=${user.secret}`
    );
    return `${window.location.protocol}//${window.location.hostname}:${
      window.location.port
    }${url}`;
    // .createUrlTree([':/team', user.teamId, 'user', user.secret])
    // .toString();
  }

  public selectAll(event) {
    event.srcElement.select();
  }
}
