import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AbsHttpErrorHandlerService } from '@core/services/abstract/error-handling/abs-http-error-handler.service';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { AuthService } from '@shared/services/concrete/auth/auth.service';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable()
export class HttpErrorHandlerService implements AbsHttpErrorHandlerService {
  constructor(private snackbar: MatSnackBar,private authService:AbsAuthService,private router:Router) {}

  handleError( req: HttpRequest<any>, next: HttpHandler,err: HttpErrorResponse): Observable<any> {
    switch(err.status){
      case 401 : 
      return  this.authService.refresh().pipe(
        switchMap(_=>{
          return next.handle(req)
        })
      )
      case 409 :
        if(err.error.data=== "Username Already Exits")
          this.snackbar.open("Username already exists","ok",{duration:2000})
        else if(err.error.data=== "Email Already Exits")
          this.snackbar.open("Email already exists","ok",{duration:2000})
      break
      case 400 : 
        // console.warn(err.error)
        // if(err.error==='admin_block'){
        //  this.authService.logout()
        //  this.snackbar.open("Blocked By Admin","ok",{duration:2000}) 
        // }
        // else
        // this.snackbar.open("Invalid data","ok",{duration:2000}) 
      break
      case 403 :
       console.log(err.error)
       if(err.error==='admin_block'){
         this.snackbar.open("Blocked By Admin","ok",{duration:2000}) 
         this.authService.logout()
        }
      break;
      default:
      this.snackbar.open("Something went wrong","ok",{duration: 2000})
      console.log(err)
    }
    return of(err);
  }
}
