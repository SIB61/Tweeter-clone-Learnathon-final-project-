import { Injectable } from "@angular/core";
import { PageResponse } from "@shared/models/structures/response.model";
import { TweetModel } from "@shared/models/tweet.model";
import { UserModel } from "@shared/models/user.model";
import { SearchService } from "@shared/services/concrete/search/search.service";
import { Observable } from "rxjs";

@Injectable({providedIn:'root',useClass:SearchService})
export abstract class AbsSearchService {
  abstract  searchUser(name:string,pageNumber:number,pageSize:number):Observable<PageResponse<UserModel[]>>
  abstract  searchTweet(hashTag:string,pageNumber:number,pageSize:number):Observable<PageResponse<TweetModel[]>>
}
