import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends AbsStorageService {
  constructor() {
    super();
  }
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
