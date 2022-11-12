import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { EMPTY, empty, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TimeoutInterceptor implements HttpInterceptor {

  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modified = req.clone({
      setHeaders: { 'X-Request-Timeout': `5000` }
    });
    return next.handle(modified).pipe();
  }

}
