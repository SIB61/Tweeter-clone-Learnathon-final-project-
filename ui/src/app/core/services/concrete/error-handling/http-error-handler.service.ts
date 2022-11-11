import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbsHttpErrorHandlerService } from '@core/services/abstract/error-handling/abs-http-error-handler.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { TokenModel } from '@shared/models/token.model';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { AuthService } from '@shared/services/concrete/auth/auth.service';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable()
export class HttpErrorHandlerService implements AbsHttpErrorHandlerService {
  constructor(private snackbar: MatSnackBar,private storageService:AbsStorageService,private authService:AbsAuthService) {}

  handleError( req: HttpRequest<any>, next: HttpHandler,err: HttpErrorResponse): Observable<any> {
    switch(err.status){
      case 401 : 
      return  this.authService.refresh().pipe(
        switchMap(_=>{
          return next.handle(req)
        })
      )
      default:
      this.snackbar.open("Something went wrong","ok",{duration: 3000})
      console.error(err)
    }
    return throwError(()=>err);
  }
}
