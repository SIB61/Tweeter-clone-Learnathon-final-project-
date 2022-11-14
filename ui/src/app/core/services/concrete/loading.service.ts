import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(){}
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  setLoading(val: boolean) {
    console.warn("loading set to ",val)
    this.loading.next(val);
  }
}
