import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AbsHttpErrorHandlerService } from '@core/services/abstract/error-handling/abs-http-error-handler.service';
import { HttpErrorHandlerService } from '@core/services/concrete/error-handling/http-error-handler.service';
import { LoadingService } from '@core/services/concrete/loading.service';
import { catchError,retry, Observable, of, throwError, take, merge, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingInterceptorService implements HttpInterceptor {
  constructor(private errorHandler:AbsHttpErrorHandlerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
       retry(2) 
       return this.errorHandler.handleError(req,next,err)
      }),
    );
  }
}
