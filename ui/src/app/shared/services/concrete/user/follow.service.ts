import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { UserModel } from '@shared/models/user.model';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowService implements AbsFollowService {
  constructor(private httpService: AbsHttpService) {}

  follow(): Observable<any> {
    return of();
  }
  unfollow(): Observable<any> {
    return of();
  }
  getFollowers(id: string): Observable<UserModel[]> {
    return this.httpService.get(ApiEndpoints.FOLLOWER).pipe(
      map((response) => {
        console.warn(response);
        return response.data;
      })
    );
  }
  getFollowings(id: string): Observable<any> {
    return this.httpService
      .get(
        ApiEndpoints.FOLLOWING,
        new HttpParams().append('PageNumber', 1).append('PageSize', 10)
      )
      .pipe(
        map((response) => {
          console.warn(response);
          return response.data;
        })
      );
  }
}
