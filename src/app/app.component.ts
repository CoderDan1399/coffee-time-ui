import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getUrlSelector } from './redux/selectors/router.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  url$: Observable<string>;
  constructor(private store: Store<any>) {
    this.url$ = this.store.select(getUrlSelector).pipe(filter(Boolean));
  }
}
