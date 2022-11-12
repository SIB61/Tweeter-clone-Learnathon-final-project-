import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';

@Injectable()
export class HttpCatchingInterceptor implements HttpInterceptor {
  constructor(private storageService: AbsStorageService) {}
  private catche = new Map<string, HttpResponse<any>>();
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.method === 'GET' &&
      this.catche.has(req.url + req.params.toString())
    )
      return of(this.catche.get(req.url + req.params.toString()));
    console.log(req.url);
    return next.handle(req).pipe(
      tap((res) => {
        if (req.method === 'GET' && res.type === HttpEventType.Response) {
          this.catche.set(req.url + req.params.toString(), res);
        } else if (
          req.method === 'PUT' &&
          res.type === HttpEventType.Response
        ) {
          let myUrl = environment.base_url + ApiEndpoints.USERS;
          if (req.url == myUrl) {
            this.catche.delete(req.url + req.params.toString());
          }
        }
      })
    );
  }
}
