
import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { ComponentStore } from '@ngrx/component-store';
import { UserModel } from '@shared/models/user.model';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { mergeMap, Observable, of, tap } from 'rxjs';

@Injectable()
export class FollowingListComponentStore extends ComponentStore<{
  followings: UserModel[];
  pageNumber: number;
  loading: boolean;
}> {
  constructor(
    private followService: AbsFollowService,
    private storageService: AbsStorageService
  ) {
    super({
      followings: [],
      pageNumber: 1,
      loading: false,
    });
  }
  pageSize = () => Math.floor(window.innerHeight / 50);
  user = this.storageService.getObject<UserModel>(this.storageService.USER);

  end = false
  loading$ = this.select(state=>state.loading)
  updateLoading=this.updater(state=>({...state,loading:!state.loading}))
  followings$ = this.select((state) => state.followings);
  pageNumber$ = this.select((state) => state.pageNumber);


  updatePage = this.updater((state)=>({...state,pageNumber:this.end?state.pageNumber:state.pageNumber+1}))
  updateFollowings = this.updater((state,followings:UserModel[])=>({...state,followings:[...state.followings,...followings]}))

  loadFollowings = this.effect((pageNumber$:Observable<number>) => {
    return pageNumber$.pipe(
      mergeMap((pageNumber) => {
        this.updateLoading()
        return this.followService.getFollowings(
          this.user.id,
          pageNumber,
          this.pageSize()
        ).pipe(tap(followings=>{
            this.updateLoading()
            if(followings.length<this.pageSize())
            this.end=true
            this.updateFollowings(followings)  
          }));
      })
    );
  });
}
