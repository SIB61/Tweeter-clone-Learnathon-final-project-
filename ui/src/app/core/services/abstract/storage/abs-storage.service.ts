import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export abstract class AbsStorageService{
  USER='user'
  TOKEN='token'
  abstract get(key:string):string|null; 
  abstract set(key:string,value:string):void;
  abstract getObject<T>(key:string):T|null
  abstract setObject(key:string,value:any):void; 
  abstract clear():void;
}
