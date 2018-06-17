import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { pipe, not, clone } from 'ramda';

@Injectable()
export class FakeDataService {
  private data: any = {};

  constructor() {
    this.load();
  }

  get(key) {
    return clone(this.data[key]);
  }
  addToArray(key, value) {
    this.createArrayIfRequired(key);
    this.data[key].push(clone(value));
    this.save();
  }

  replaceInArray<T>(key, newItem: T, selector: (item: T) => boolean) {
    this.removeFromArray(key, selector);
    this.addToArray(key, newItem);
  }

  removeFromArray(key, selector: (item) => boolean) {
    this.createArrayIfRequired(key);
    this.data[key] = this.data[key].filter(
      pipe(
        selector,
        not
      )
    );
    this.save();
  }

  getFromArray<T>(key, selector: (item: T) => boolean): T[] {
    this.createArrayIfRequired(key);

    return clone(this.data[key].filter(selector));
  }

  set(key, value) {
    this.data[key] = clone(value);
    this.save();
  }

  clearPersistentStorage() {
    window.localStorage.setItem('DATA', null);
  }

  private createArrayIfRequired(key) {
    if (!this.data[key] || Array.isArray(this.data[key]) === false) {
      this.data[key] = [];
    }
  }
  private save() {
    window.localStorage.setItem('DATA', JSON.stringify(this.data));
  }
  private load() {
    this.data = {};
    try {
      const dataStr = window.localStorage.getItem('DATA');
      if (dataStr) {
        this.data = JSON.parse(dataStr);
      }
    } catch {}
  }
}
