import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);

  loading$ = this.loading.asObservable();
  setLoading(val: boolean) {
    this.loading.next(val);
  }
}
