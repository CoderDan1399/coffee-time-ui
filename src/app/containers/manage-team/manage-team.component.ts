import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamActions } from '../../redux/actions/team.actions';
import { newId } from '../../common/new-id';
import { getCurrentUrl } from '../../common/window-utils';
import { Router, ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'manage-team',
  templateUrl: './manage-team.component.html',
})
export class ManageTeamComponent {
  public teamName: string;
  get currentUrl() {
    return getCurrentUrl();
  }

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public onSubmit(event) {}
  public addUser() {
    console.log('huh', this.router.routerState);
    this.route.params
      .pipe(
        first(),
        tap(p => {
          this.router.navigate(['user/add'], { relativeTo: this.route });
        })
      )
      .subscribe();
  }
}
