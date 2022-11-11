import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/concrete/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useClass:HttpService
})
export abstract class AbsHttpService {
  public abstract get(url: string, params?: HttpParams): Observable<any>;
  public abstract post(
    url: string,
    body: any,
    params?: HttpParams
  ): Observable<any>;
  public abstract put(
    url: string,
    body: any,
    params?: HttpParams
  ): Observable<any>;
  public abstract patch(
    url: string,
    body: any,
    params?: HttpParams
  ): Observable<any>;
  public abstract delete(url: string, params?: HttpParams): Observable<any>;
}
