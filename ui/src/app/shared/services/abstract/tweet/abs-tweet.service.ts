import { Injectable } from '@angular/core';
import { TweetModel } from '@shared/models/tweet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbsTweetService {
  public abstract tweet(tweet: TweetModel): Observable<any>;
  public abstract searchTweet(tag: string): Observable<TweetModel[]>;
  public abstract getUserTweets(userId: string): Observable<TweetModel[]>;
}
