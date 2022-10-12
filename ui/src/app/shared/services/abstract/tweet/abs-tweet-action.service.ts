import { Injectable } from '@angular/core';
import { PageResponse } from '@shared/models/structures/response.model';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class AbsTweetActionService {
  abstract like(tweetId: string): Observable<any>;
  abstract unlike(tweetId: string): Observable<any>;
  abstract retweet(tweetId: string): Observable<any>;
  abstract comment(commentModel: CommentModel): Observable<any>;
  abstract loadComments(
    tweetId: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<PageResponse<CommentModel[]>>;
  abstract deleteComment(commentId: string): Observable<any>;
}
