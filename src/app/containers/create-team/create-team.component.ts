import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '../../redux/actions/actions';
import { newId } from '../../common/new-id';

@Component({
  selector: 'create-team',
  templateUrl: './create-team.component.html',
})
export class CreateTeamComponent {
  public teamName: string;
  constructor(private store: Store<any>) {}
  public onSubmit(event) {
    console.log('submit', event);
    this.store.dispatch(
      new Actions.CreateTeam({ id: newId(), name: this.teamName })
    );
  }
}
