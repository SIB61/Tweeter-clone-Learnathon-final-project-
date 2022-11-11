import { Injectable } from '@angular/core';
import { UserModel } from '@shared/models/user.model';
import { FollowService } from '@shared/services/concrete/user/follow.service';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root',useClass:FollowService})
export abstract class AbsFollowService {
  abstract follow(userId: string): Observable<any>;
  abstract unfollow(userId: string): Observable<any>;
  abstract getFollowers(
    userId: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<UserModel[]>;
  abstract getFollowings(
    userId: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<UserModel[]>;
}
