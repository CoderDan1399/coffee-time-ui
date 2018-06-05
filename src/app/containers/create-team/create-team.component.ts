import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'create-team',
  templateUrl: './create-team.component.html',
})
export class CreateTeamComponent {
  constructor(private store: Store<any>) {}
}
