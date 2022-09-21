import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbsAuthService {
  constructor() { }
  abstract login(username:string,password:string):Observable<any>
  abstract refresh():Observable<any>
}
