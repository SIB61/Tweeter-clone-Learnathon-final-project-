import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { LoadingService } from '@core/services/concrete/loading.service';
import { props, Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { tapResponse } from '@ngrx/component-store';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoading(true);
    // this.store.dispatch(setHttpLoading({httpLoading:true}))
    console.warn('loading...');
    return next.handle(request).pipe(
      tapResponse(
        (_) => {
          this.loadingService.setLoading(false);
          // this.store.dispatch(setHttpLoading({httpLoading:false}))
        },
        (err) => {
          this.loadingService.setLoading(false);
        }
      )
    );
  }
}
