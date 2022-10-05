import { Injectable } from '@angular/core';
import { TweetModel } from '@shared/models/tweet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbsTweetService {
  public abstract tweet(tweet: TweetModel): Observable<any>;
  public abstract getTimeline(
    pageNumber: number,
    pageSize: number
  ): Observable<TweetModel[]>;
  public abstract getPreviousPage(): Observable<any>;
  public abstract getNextPage(): Observable<any>;
}
