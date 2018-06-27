import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RouterSelectors } from './redux/selectors/router.selectors';
import {
  Router,
  NavigationCancel,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'app';
  loading = false;
  url$: Observable<string>;
  constructor(private store: Store<any>, private router: Router) {
    this.url$ = this.store
      .select(RouterSelectors.getUrlSelector)
      .pipe(filter(Boolean));

    this.router.events.subscribe((event: Event) => {
      this.checkRouterEvent(event);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }
}
