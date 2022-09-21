import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class AbsFollowService{
  abstract follow():Observable<any>
  abstract unfollow():Observable<any>
  abstract getFollowers(id:string):Observable<any>
  abstract getFollowings(id:string):Observable<any>
}
