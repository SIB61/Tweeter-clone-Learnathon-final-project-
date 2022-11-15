import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { Response } from '@shared/models/structures/response.model';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { map, Observable, take, takeLast, tap } from 'rxjs';

@Injectable()
export class TweetService implements AbsTweetService {



  constructor(
    private httpService: AbsHttpService,
    private snackbar: MatSnackBar
  ) {}

  public tweet(tweet: TweetModel): Observable<any> {
    return this.httpService.post(ApiEndpoints.TWEET, tweet);
  }

  public getUserTweets(userId: string,pageNumber:number,pageSize:number): Observable<TweetModel[]> {
    return this.httpService
      .get(ApiEndpoints.TWEET+"/tweets/"+userId,new HttpParams().append('pageNumber',pageNumber).append('pageSize',pageSize))
      .pipe(
        map((response) => {
          console.warn(response);
          return response.data;
        })
      );
  }

   public getTweet(tweetId:string):Observable<TweetModel>{
    return this.httpService.get(ApiEndpoints.TWEETID(tweetId))
    .pipe(map(response=>response.data))
  }

  public delete(tweetId: string): Observable<Response<any>> {
    console.error(tweetId)
return  this.httpService.delete(ApiEndpoints.TWEETID(tweetId)).pipe(take(1),tap(u=>console.log(u))) 
  }


  public update(id: string, tweet: TweetModel): Observable<any> {
     return this.httpService.put(ApiEndpoints.TWEETID(id),tweet).pipe(take(1))
  }
}
