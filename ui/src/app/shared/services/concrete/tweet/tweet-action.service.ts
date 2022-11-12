import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { PageResponse } from '@shared/models/structures/response.model';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { map, Observable, take, tap } from 'rxjs';

@Injectable()
export class TweetActionService implements AbsTweetActionService {
  constructor(private httpService: AbsHttpService) {}

  updateComment(id: string, content: string): Observable<any> {
  return  this.httpService.put(ApiEndpoints.COMMENT+'/update',{commentId:id,content:content})
  }

  like(tweetId: string): Observable<any> {
    return this.httpService.post(ApiEndpoints.LIKE(tweetId), {}).pipe(take(1));
  }

  unlike(tweetId: string): Observable<any> {
    return this.httpService.delete(ApiEndpoints.LIKE(tweetId)).pipe(take(1));
  }

  retweet(tweetId: string): Observable<any> {
    return this.httpService
      .post(ApiEndpoints.TWEETID(tweetId), {})
      .pipe(take(1));
  }

  comment(commentModel: CommentModel): Observable<any> {
    console.warn(commentModel);
    return this.httpService.post(ApiEndpoints.COMMENT, commentModel).pipe(
      tap((v) => console.warn(v)),
      take(1)
    );
  }

  loadComments(
    tweetId: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<CommentModel[]> {
    return this.httpService
      .get(
        ApiEndpoints.COMMENT,
        new HttpParams()
          .append('tweetId', tweetId)
          .append('PageNumber', pageNumber)
          .append('PageSize', pageSize)
      )
      .pipe(
        take(1),
        map((response) => response.data)
      );
  }

  deleteComment(commentId: string): Observable<any> {
    return this.httpService
      .delete(ApiEndpoints.COMMENT + '/' + commentId)
      .pipe(take(1));
  }
}
