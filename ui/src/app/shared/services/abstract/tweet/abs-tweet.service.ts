import { Injectable } from '@angular/core';
import { Response } from '@shared/models/structures/response.model';
import { TweetModel } from '@shared/models/tweet.model';
import { TweetService } from '@shared/services/concrete/tweet/tweet.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useClass:TweetService
})
export abstract class AbsTweetService {
  public abstract tweet(tweet: TweetModel): Observable<any>;
  public abstract getUserTweets(userId: string,pageNumber:number,pageSize:number): Observable<TweetModel[]>;
  public abstract getTweet(tweetId:string): Observable<TweetModel>;
  public abstract delete(tweetId:string):Observable<Response<any>>
  public abstract update(id:string,tweet:TweetModel):Observable<any>
}
