import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../redux/actions/team.actions';
import { newId } from '../../common/new-id';
import { getCurrentUrl } from '../../common/window-utils';

@Component({
  selector: 'manage-team',
  templateUrl: './manage-team.component.html',
})
export class ManageTeamComponent {
  public teamName: string;
  get currentUrl() {
    return getCurrentUrl();
  }

  constructor(private store: Store<any>) {}
  public onSubmit(event) {}
}
