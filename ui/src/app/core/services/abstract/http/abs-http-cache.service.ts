import { HttpResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { HttpCacheService } from "@core/services/concrete/http/http-cache.service";


@Injectable({providedIn:'root',useClass:HttpCacheService})
export abstract class AbsHttpCacheService{
  abstract get(url:string):HttpResponse<any>|undefined
  abstract put(url:string,res:HttpResponse<any>):void
  abstract update(url:string,value:any):void
  abstract delete(url:string):void
  abstract clear():void
}
