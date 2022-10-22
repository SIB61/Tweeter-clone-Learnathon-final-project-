import { Injectable } from "@angular/core";
import { PageResponse, Response } from "@shared/models/structures/response.model";
import { UserModel } from "@shared/models/user.model";
import { Observable } from "rxjs";

@Injectable()
export abstract class AbsAdminService{
  abstract block(userId:string):Observable<Response<any>>
  abstract unblock(userId:string):Observable<Response<any>>
  abstract getUsers(filter:string,pageNumber:number,pageSize:number):Observable<PageResponse<UserModel[]>>
  abstract updateUser(userId:string,user:UserModel):Observable<Response<any>>
}

