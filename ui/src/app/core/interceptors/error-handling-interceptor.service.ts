import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpErrorHandlerService } from '@core/services/abstract/error-handling/abs-http-error-handler.service';
import { LoadingService } from '@core/services/concrete/loading.service';
import {
  catchError,
  retry,
  Observable,
  of,
  throwError,
  take,
  merge,
  map,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingInterceptorService implements HttpInterceptor {
  constructor(private errorHandler: AbsHttpErrorHandlerService,private loadinService:LoadingService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        retry(2);
        this.loadinService.setLoading(false)
        return this.errorHandler.handleError(req, next, err);
      })
    );
  }
}
