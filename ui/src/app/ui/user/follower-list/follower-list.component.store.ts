import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { ComponentStore } from '@ngrx/component-store';
import { UserModel } from '@shared/models/user.model';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { mergeMap, Observable, of, tap } from 'rxjs';

@Injectable()
export class FollowerListComponentStore extends ComponentStore<{
  followers: UserModel[];
  pageNumber: number;
  loading: boolean;
}> {
  constructor(
    private followService: AbsFollowService,
    private storageService: AbsStorageService
  ) {
    super({
      followers: [],
      pageNumber: 1,
      loading: false,
    });
  }

  end=false
  pageSize = () => Math.floor(window.innerHeight / 50);
  user = this.storageService.getObject<UserModel>(this.storageService.USER);
  loading$ = this.select(state=>state.loading)

  updateLoading=this.updater(state=>({...state,loading:!state.loading}))

  followers$ = this.select((state) => state.followers);
  pageNumber$ = this.select((state) => state.pageNumber);

  updatePage = this.updater((state)=>({...state,pageNumber:this.end?state.pageNumber:state.pageNumber+1}))
  updateFollowers = this.updater((state,followers:UserModel[])=>({...state,followers:[...state.followers,...followers]}))

  loadFollowers = this.effect((pageNumber$:Observable<number>) => {
    return pageNumber$.pipe(
      mergeMap((pageNumber) => {
        this.updateLoading()
        return this.followService.getFollowers(
          this.user.id,
          pageNumber,
          this.pageSize()
        ).pipe(tap(
             followers=>{
              this.updateLoading()
              if(followers.length<this.pageSize())
              this.end=true
              this.updateFollowers(followers)   
            }
          ));
      })
    );
  });
}
