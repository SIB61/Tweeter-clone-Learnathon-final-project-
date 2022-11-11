
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable()
export class HttpCatchingInterceptor implements HttpInterceptor {
    private catche = new Map<string, HttpResponse<any>>();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if( req.method === 'GET' &&  this.catche.has(req.url+req.params.toString())) return of(this.catche.get(req.url+req.params.toString()))
        return next.handle(req).pipe(
            tap(res=>{
              if( req.method === 'GET' && res.type===HttpEventType.Response){
                 this.catche.set(req.url+req.params.toString(),res)
              }
            })
        );
    }
}