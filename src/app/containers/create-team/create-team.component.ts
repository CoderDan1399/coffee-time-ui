import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../redux/actions/team.actions';
import { newId } from '../../common/new-id';

@Component({
  selector: 'create-team',
  templateUrl: './create-team.component.html',
})
export class CreateTeamComponent {
  public teamName: string;
  private id = newId();
  constructor(private store: Store<any>) {}
  public onSubmit(event) {
    console.log('submit', event);
    this.store.dispatch(
      new TeamActions.UpsertOne({ id: this.id, name: this.teamName })
    );

    this.store.dispatch(
      new TeamActions.Save({ id: this.id, name: this.teamName })
    );
    this.store.select();
  }
}
