import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpRequestModel {
  method: string;
  url: string;
  body?: any;
  params?: HttpParams;
  headers?: HttpHeaders;
}
