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
  abstract save(key:string,value:string):void;

}
