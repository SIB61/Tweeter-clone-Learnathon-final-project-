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
import { LoadingService } from '@core/services/concrete/loading.service';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingInterceptorService implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar,private loadingService:LoadingService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        // console.log(err);
        if(err){
          switch(err.status)
          {
            case 400: 
              this._snackBar.open("authentication error",'ok',{duration:2*1000});
// =======
//               if (err.error.errors) {
//                 const modalStateErrors = [];
//                 for (const key in err.error.errors) {
//                   if (err.error.errors[key]) {
//                     modalStateErrors.push(err.error.errors[key])
//                   }
//                 }
//                
//                 modalStateErrors.forEach(elememt => {
//                   this._snackBar.open(err.status, elememt);
//                 });
//               
//                 throw modalStateErrors.flat();
//               } else if (typeof(err.error) === 'object') {
//                 console.log("Object" + err);
//                 this._snackBar.open(err.statusText, err.status);
//               } else {
//                 console.log(err);
//                 this._snackBar.open(err.error.data, err.status);
//               }
// >>>>>>> af3f800c22f043aa078055f7cf98f79ee8136a0a
              break;
            case 401:
              console.log(err);
              this._snackBar.open(err.status, err.error.data,{duration:20000});
              break;
            case 404:
              console.log(err.error.data);
              this._snackBar.open(err.status, err.error.data,{duration:20000});
              break;
            case 500:
              this._snackBar.open(err.status, err.error.data,{duration:20000});
              break;
            case 500:
              this._snackBar.open(err.status, err.error.message);
              break;
          }
        }
        throw(err) ;
      })
    );
  }
}
