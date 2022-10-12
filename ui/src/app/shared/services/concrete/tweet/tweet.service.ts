import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService implements AbsTweetService {
  constructor(
    private httpService: AbsHttpService,
    private snackbar: MatSnackBar
  ) {}

  public tweet(tweet: TweetModel): Observable<any> {
    return this.httpService.post(ApiEndpoints.TWEET, tweet).pipe(
      tap((value) => {
        this.snackbar.open('Tweeted', 'ok');
        console.warn(value);
      })
    );
  }

  public searchTweet(tag: string): Observable<TweetModel[]> {
    return this.httpService
      .get(ApiEndpoints.TWEET, new HttpParams().append('hashTag', tag))
      .pipe(
        map((response) => {
          console.warn(response);
          return response.data;
        })
      );
  }

  public getUserTweets(userId: string): Observable<TweetModel[]> {
    return this.httpService
      .get(ApiEndpoints.TWEET, new HttpParams().append('userId', userId))
      .pipe(
        map((response) => {
          console.warn(response);
          return response.data;
        })
      );
  }
}
