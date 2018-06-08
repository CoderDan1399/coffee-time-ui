import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { pipe, not } from 'ramda';

@Injectable()
export class FakeDataService {
  private data: any = {};

  get(key) {
    return this.data[key];
  }
  addToArray(key, value) {
    this.createArrayIfRequired(key);
    this.data[key].push(value);
  }

  removeFromArray(key, selector: (item) => boolean) {
    this.createArrayIfRequired(key);
    this.data[key] = this.data[key].filter(
      pipe(
        selector,
        not
      )
    );
  }

  getFromArray(key, selector: (item) => boolean): any[] {
    this.createArrayIfRequired(key);

    return this.data[key].filter(selector);
  }

  set(key, value) {
    this.data[key] = value;
  }

  private createArrayIfRequired(key) {
    if (!this.data[key] || Array.isArray(this.data[key]) == false) {
      this.data[key] = [];
    }
  }
}
