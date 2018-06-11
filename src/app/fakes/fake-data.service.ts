import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { pipe, not } from 'ramda';

@Injectable()
export class FakeDataService {
  private data: any = {};

  constructor() {
    this.load();
  }

  get(key) {
    return this.data[key];
  }
  addToArray(key, value) {
    this.createArrayIfRequired(key);
    this.data[key].push(value);
    this.save();
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

  getFromArray(key, selector: (item) => boolean): any[] {
    this.createArrayIfRequired(key);

    return this.data[key].filter(selector);
  }

  set(key, value) {
    this.data[key] = value;
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
