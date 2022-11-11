import { Injectable } from "@angular/core";
import { StorageService } from "@core/services/concrete/storage/storage.service";

@Injectable({providedIn:'root',useClass:StorageService})
export abstract class AbsStorageService{
  USER:string
  TOKEN:string
  abstract get(key:string):string|null; 
  abstract set(key:string,value:string):void;
  abstract getObject<T>(key:string):T|null
  abstract setObject(key:string,value:any):void; 
  abstract clear():void;
}
