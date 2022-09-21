import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http/http.service';
import { AbsAuthService } from '@shared/abs-services/auth/abs-auth.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AbsAuthService {
  constructor(private httpService:HttpService) { }
  login(username:string,password:string){
    return this.httpService.post(environment.base_url+ApiEndpoints.LOGIN,{username,password}).pipe(
      tap(value=>{
        console.log(value.data) 
      })
    )
  }
  refresh(){
    return this.httpService.get(environment.base_url+ApiEndpoints.REFRESH).pipe(tap((data:any)=>{

    }))
  }
}
