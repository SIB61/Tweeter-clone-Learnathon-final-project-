import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class AbsUserService{
  abstract getAllUser():Observable<any>
  abstract getProfile(id:string):Observable<any>
  abstract getUserByPage(pageSize:number,pageNumber:number):Observable<any>
  abstract searchUser(name:string):Observable<any>
  abstract updateUser():Observable<any>
  abstract deleteUser():Observable<any>
  abstract createUser():Observable<any>
}
