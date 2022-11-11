import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService implements AbsHttpService {
  constructor(private httpClient: HttpClient) {}

  get(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get( url, { params: params });
  }
  post(url: string, body: any, params?: HttpParams): Observable<any> {
    return this.httpClient.post( url, body, {
      params: params,
    });
  }
  put(url: string, body: any, params?: HttpParams): Observable<any> {
    return this.httpClient.put( url, body, {
      params: params,
    });
  }
  patch(url: string, body: any, params?: HttpParams): Observable<any> {
    return this.httpClient.patch( url, body, {
      params: params,
    });
  }
  delete(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.delete(url, {
      params: params,
    });
  }
}
