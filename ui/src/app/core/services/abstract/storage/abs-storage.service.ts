import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export abstract class AbsStorageService{
  username:string = 'username';
  userId:string = 'user_id';
  name:string = 'name'
  birthDate:string = 'birth_date'
  accessToken='access_token'
  refreshToken="refresh_token"

  abstract get(key:string):string|null; 
  abstract set(key:string,value:string):void;
  abstract getObject<T>(key:string):T|null
  abstract setObject(key:string,value:any):void; 

}
