import { Injectable } from '@angular/core';
import { UserModel } from '@shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AbsFollowService {
  abstract follow(): Observable<any>;
  abstract unfollow(): Observable<any>;
  abstract getFollowers(id: string): Observable<UserModel[]>;
  abstract getFollowings(id: string): Observable<UserModel[]>;
}
