import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';

@Injectable()
export class StorageService implements AbsStorageService {
  constructor() {
  }
  USER: string='user';
  TOKEN: string='token';
  get(key: string) {
    return localStorage.getItem(key);
  }
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  getObject<T>(key: string): T|null {
    return JSON.parse(localStorage.getItem(key)) as T
  }
  setObject(key: string, value: any): void {
    let userJsonString = JSON.stringify(value);
    localStorage.setItem(key,userJsonString);
  }
  clear(): void {
      localStorage.clear()
  }
}
