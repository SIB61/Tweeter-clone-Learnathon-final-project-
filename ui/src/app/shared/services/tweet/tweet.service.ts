import { validateVerticalPosition } from '@angular/cdk/overlay';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbsHttpService } from '@core/abs-services/http/abs-http.service';
import { AbsTweetService } from '@shared/abs-services/tweet/abs-tweet.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { TweetModel } from '@shared/models/tweet.model';
import {
  catchError,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  take,
  tap,
} from 'rxjs';

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
  public getTimeline(pageNumber: number, pageSize: number): Observable<any[]> {
    return this.httpService
      .get(
        ApiEndpoints.TWEET + '/timeline',
        new HttpParams()
          .append('PageNumber', pageNumber)
          .append('PageSize', pageSize)
      )
      .pipe(
        map((value) => {
          console.warn(value);
          return value.data.map((val: any) => {
            let hashTag: String = val.hashTag;
            val.hashTag = hashTag.trim().split(' ');
            return val;
          });
        })
      );
  }
  public getPreviousPage(): Observable<any> {
    return of();
  }
  public getNextPage(): Observable<any> {
    return of();
  }
}
