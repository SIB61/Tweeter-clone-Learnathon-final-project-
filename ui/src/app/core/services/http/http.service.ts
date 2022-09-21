import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/abs-services/http/abs-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends AbsHttpService {
  constructor(private httpClient:HttpClient) { super() }

  get(url:string,params?:HttpParams):Observable<any>{
    return this.httpClient.get(url,{params:params})
  }
  post(url:string,body:any,params?:HttpParams):Observable<any>{
    return this.httpClient.post(url,body,{params:params})
  }
  put(url:string,body:any,params?:HttpParams):Observable<any>{
    return this.httpClient.put(url,body,{params:params})
  }
  patch(url:string,body:any,params?:HttpParams):Observable<any>{
    return this.httpClient.patch(url,body,{params:params})
  }
  delete(url:string,params?:HttpParams):Observable<any>{
    return this.httpClient.get(url,{params:params})
  }
}
