import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpRequestModel {
  url: string;
  body?: any;
  params?: HttpParams;
  headers?: HttpHeaders;
}
