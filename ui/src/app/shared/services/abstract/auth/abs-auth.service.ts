import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbsAuthService {
  constructor() { }
  abstract sendCode(email:string):Observable<any>
  abstract varifyCode(email:string,code:string):Observable<any>
  abstract changeForgottenPassword(email:string,code:string,password:string):Observable<any>
  abstract login(username:string,password:string):Observable<any>
  abstract refresh():Observable<any>
}
