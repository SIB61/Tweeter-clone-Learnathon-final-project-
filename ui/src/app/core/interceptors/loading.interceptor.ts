import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { LoadingService } from '@core/services/concrete/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoading(true);
    console.warn("loading...")
    return next.handle(request).pipe(
      tap((_) => {
        this.loadingService.setLoading(false);
      })
    );
  }
}
