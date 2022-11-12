import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { UserModel } from '@shared/models/user.model';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { map, Observable, of, take, tap } from 'rxjs';

@Injectable()
export class FollowService implements AbsFollowService {
  constructor(
    private httpService: AbsHttpService,
    private snackbar: MatSnackBar
  ) {}

  follow(userId: string): Observable<any> {
    return this.httpService.post(ApiEndpoints.FOLLOW(userId), {}).pipe(take(1));
  }
  unfollow(userId: string): Observable<any> {
    return this.httpService.delete(ApiEndpoints.FOLLOW(userId)).pipe(take(1));
  }
  getFollowers(
    userId: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<UserModel[]> {
    return this.httpService
      .get(
        ApiEndpoints.FOLLOWER(userId),
        new HttpParams()
          .append('PageNumber', pageNumber)
          .append('PageSize', pageSize)
      )
      .pipe(
        map((response) => {
          console.warn(response);
          return response.data;
        })
      );
  }
  getFollowings(
    userId: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<UserModel[]> {
    return this.httpService
      .get(
        ApiEndpoints.FOLLOWING(userId),
        new HttpParams()
          .append('PageNumber', pageNumber)
          .append('PageSize', pageSize)
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}
