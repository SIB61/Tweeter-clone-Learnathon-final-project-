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
  save(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
}
