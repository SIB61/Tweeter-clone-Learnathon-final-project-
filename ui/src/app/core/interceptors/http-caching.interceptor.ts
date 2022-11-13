import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AbsHttpCacheService } from '@core/services/abstract/http/abs-http-cache.service';

@Injectable()
export class HttpCatchingInterceptor implements HttpInterceptor {

  constructor(private httpCacheService:AbsHttpCacheService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = req.url + req.params.toString();
    if (this.httpCacheService.get(url) && req.method === 'GET') {
      return of(this.httpCacheService.get(url));
    }
    if(req.method === 'PUT'){
        this.httpCacheService.clear() 
    }
    else if(req.method === 'POST'){
        this.httpCacheService.clear() 
    }
    else if(req.method === 'DELETE'){
        this.httpCacheService.clear() 
    }
    
   return next.handle(req).pipe(
      tap((res) => {
        if (res.type === HttpEventType.Response && req.method === 'GET')
          this.httpCacheService.put(url, res);
      })
    );
  }

}
