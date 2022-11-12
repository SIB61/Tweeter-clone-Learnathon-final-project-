import { Injectable } from '@angular/core';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { TweetActionService } from '@shared/services/concrete/tweet/tweet-action.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root',useClass:TweetActionService })
export abstract class AbsTweetActionService {
  abstract like(tweetId: string): Observable<any>;
  abstract unlike(tweetId: string): Observable<any>;
  abstract retweet(tweetId: string): Observable<any>;
  abstract comment(commentModel: CommentModel): Observable<any>;
  abstract loadComments(
    tweetId: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<CommentModel[]>;
  abstract deleteComment(commentId: string): Observable<any>;
  abstract updateComment(id:string,content:string):Observable<any>
}
