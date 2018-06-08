import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../redux/actions/team.actions';
import { newId } from '../../common/new-id';

@Component({
  selector: 'manage-team',
  templateUrl: './manage-team.component.html',
})
export class ManageTeamComponent {
  public teamName: string;
  constructor(private store: Store<any>) {}
  public onSubmit(event) {
    console.log('submit', event);
    this.store.dispatch(
      new TeamActions.AddOne({ id: newId(), name: this.teamName })
    );
  }
}
