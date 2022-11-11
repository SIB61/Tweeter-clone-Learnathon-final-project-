import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbsHttpService } from "@core/services/abstract/http/abs-http.service";
import { ApiEndpoints } from "@shared/enums/api-endpoint.enum";
import { PageResponse } from "@shared/models/structures/response.model";
import { TweetModel } from "@shared/models/tweet.model";
import { UserModel } from "@shared/models/user.model";
import { AbsSearchService } from "@shared/services/abstract/search/abs-search.service";
import { Observable, take } from "rxjs";


@Injectable()
export class SearchService implements AbsSearchService{
  constructor(private httpService: AbsHttpService){}
  searchTweet(hashTag: string, pageNumber: number, pageSize: number): Observable<PageResponse<TweetModel[]>> {
    return this.httpService.get(
      ApiEndpoints.SEARCH_TWEET,
      new HttpParams().append('hashTag',hashTag)
      .append('pageNumber',pageNumber)
      .append('pageSize',pageSize)
    ).pipe(take(1))
  }
  searchUser(name: string, pageNumber: number, pageSize: number): Observable<PageResponse<UserModel[]>> {
    return this.httpService.get(
      ApiEndpoints.SEARCH_USER,
      new HttpParams().append('fullName',name)
      .append('PageNumber',pageNumber)
      .append('PageSize',pageSize)
    ).pipe(take(1))
  }
}
