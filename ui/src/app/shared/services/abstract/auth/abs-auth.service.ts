import { Injectable } from '@angular/core';
import { TokenModel } from '@shared/models/token.model';
import { AuthService } from '@shared/services/concrete/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useClass: AuthService
})
export abstract class AbsAuthService {
  constructor() { }
  abstract sendCode(email:string):Observable<any>
  abstract varifyCode(email:string,code:string):Observable<any>
  abstract changeForgottenPassword(email:string,code:string,password:string):Observable<any>
  abstract login(username:string,password:string):Observable<any>
  abstract refresh():Observable<any>
  abstract logout():void
}
