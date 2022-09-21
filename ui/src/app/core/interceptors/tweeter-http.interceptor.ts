import {HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponseBase, HttpStatusCode} from '@angular/common/http'
import { Observable, retry, tap } from 'rxjs'
export class TweeterHttpInterceptor implements HttpInterceptor{
  constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let accessToken = localStorage.getItem('access_token')
    req = req.clone({
        headers:new HttpHeaders().append('Authorization',`Bearer ${accessToken}`)
    })
    return next.handle(req).pipe(tap(event=>{
      if(event.type == HttpEventType.Response){
        if(event.status != HttpStatusCode.Ok){
          retry(3)
        } 
      }
    })); 
  }
}
