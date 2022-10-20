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
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingInterceptorService implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        if(err){
          switch(err.status)
          {
            case 400: 
              if (err.error.errors) {
                const modalStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modalStateErrors.push(err.error.errors[key])
                  }
                }
               
                modalStateErrors.forEach(elememt => {
                  this._snackBar.open(err.status, elememt);
                });
              
                throw modalStateErrors.flat();
              } else if (typeof(err.error) === 'object') {
                console.log("Object" + err);
                this._snackBar.open(err.statusText, err.status);
              } else {
                console.log(err);
                this._snackBar.open(err.error.data, err.status);
              }
              break;
            case 401:
              console.log(err);
              this._snackBar.open(err.status, err.error.data);
              break;
            case 404:
              console.log(err.error.data);
              this._snackBar.open(err.status, err.error.data);
              break;
            case 409:
              this._snackBar.open(err.status, err.error.data);
              break;
            case 500:
              this._snackBar.open(err.status, err.error.message);
              break;
          }
        }

        return of(err);
      })
    );
  }
}
