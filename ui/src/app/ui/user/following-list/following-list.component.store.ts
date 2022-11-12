
import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { ComponentStore } from '@ngrx/component-store';
import { UserModel } from '@shared/models/user.model';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { mergeMap, Observable } from 'rxjs';

@Injectable()
export class FollowingListComponentStore extends ComponentStore<{
  followings: UserModel[];
  pageNumber: number;
  loading: boolean;
  end: boolean;
}> {
  constructor(
    private followService: AbsFollowService,
    private storageService: AbsStorageService
  ) {
    super({
      followings: [],
      pageNumber: 1,
      loading: false,
      end: false,
    });
  }
  pageSize = () => Math.floor(window.innerHeight / 50);
  user = this.storageService.getObject<UserModel>(this.storageService.USER);

  followings$ = this.select((state) => state.followings);
  pageNumber$ = this.select((state) => state.pageNumber);


  updatePage = this.updater((state)=>({...state,pageNumber:state.pageNumber+1}))

  loadFollowings = this.effect((pageNumber$:Observable<number>) => {
    return pageNumber$.pipe(
      mergeMap((pageNumber) => {
        return this.followService.getFollowings(
          this.user.id,
          pageNumber,
          this.pageSize()
        );
      })
    );
  });
}
