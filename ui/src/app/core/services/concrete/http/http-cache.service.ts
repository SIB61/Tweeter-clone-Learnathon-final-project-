import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpCacheService } from '@core/services/abstract/http/abs-http-cache.service';
import { take, tap, timer } from 'rxjs';

@Injectable()
export class HttpCacheService implements AbsHttpCacheService {
  cache : Map<string,HttpResponse<any>> = new Map<string,HttpResponse<any>>();
  get(url: string): HttpResponse<any> | undefined {
    return this.cache.get(url);
  }
  put(url: string, res: HttpResponse<any>): void {
    this.cache.set(url, res);
    timer(10000).pipe(
      take(1),
      tap((_) => {
        this.delete(url)
      })
    ).subscribe();
  }
  delete(url: string): void {
    this.cache.delete(url)
  }
  update(url: string, value: any): void { 
  }

  clear(): void {
   this.cache.clear() 
  }
}
