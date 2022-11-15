import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { LoadingService } from '@core/services/concrete/loading.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TweetModel } from '@shared/models/tweet.model';
import { UserModel } from '@shared/models/user.model';
import { AbsBlockService } from '@shared/services/abstract/user/abs-block.service';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { AbsUserService } from '@shared/services/abstract/user/abs-user.service';
import { catchError, mergeMap, Observable, of, tap } from 'rxjs';

interface UserProfileCardComponentState {
  user: UserModel;
  id: string;
}

@Injectable()
export class UserProfileCardComponentStore extends ComponentStore<UserProfileCardComponentState> {
  constructor(
    private userService: AbsUserService,
    private storageService: AbsStorageService,
    private snackbar: MatSnackBar,

    private followService: AbsFollowService,
    private blockService: AbsBlockService,
    private location: Location,
    private loadingService:LoadingService
  ) {
    super({ user: { fullName: '', userName: '',isFollow:true,isBlock:false }, id: '' });
    // super()
  }

  user$ = this.select((state) => state.user);
  id$ = this.select((state) => state.id);

  updateUserState = this.updater((state, user: UserModel) => ({
    ...state,
    user: { ...state.user, ...user },
  }));

  changeFollowerCount = this.updater((state,increase:boolean)=>{
    let newCount = increase? state.user.totalFollowers + 1 : state.user.totalFollowers-1
    let user = state.user
    user.totalFollowers=newCount
    return {...state,user:user}
  })

  updateId = this.updater((state, id: string) => ({ ...state, id: id }));

  loadUser = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      mergeMap((id) =>{
        this.loadingService.setLoading(true)
       return this.userService.getUser(id).pipe(
          tap((user) => {
            this.loadingService.setLoading(false)
            if(id===this.storageService.getObject<UserModel>(this.storageService.USER).id)
            this.storageService.setObject(this.storageService.USER,user)
            this.updateUserState(user);
          })
        )}
      )
    );
  });

  updateUser = this.effect((user$: Observable<UserModel>) => {
    return user$.pipe(
      mergeMap((user) => {
      this.loadingService.setLoading(true)
        this.updateUserState(user);
        return this.userService.updateUser(user).pipe(
          tap((_) => {
           this.loadingService.setLoading(false)
            this.snackbar.open('updated successfully', 'ok', {
              duration: 2000,
            });
          })
        );
      })
    );
  });

  updatePassword = this.effect((credentials$: Observable<{currentPassword,newPassword}>) => {
    return credentials$.pipe(
      mergeMap((credentials) => {
      this.loadingService.setLoading(true)
        return this.userService.changePassword(credentials.currentPassword,credentials.newPassword).pipe(
          tap((_) => {
           this.loadingService.setLoading(false)
            this.snackbar.open('password updated successfully', 'ok', {
              duration: 2000,
            });
          })
        );
      })
    );
  });
  follow = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      mergeMap((userId) => {
      this.loadingService.setLoading(true)
        return this.followService.follow(userId).pipe(tap(
          _=>{
            this.changeFollowerCount(true)
            this.loadingService.setLoading(false)
          }
        ));
      })
    );
  });

  unfollow = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      mergeMap((userId) => {
      this.loadingService.setLoading(true)
        return this.followService.unfollow(userId).pipe(tap(
          _=>{
            this.changeFollowerCount(false)
            this.loadingService.setLoading(false)
          }
        ));
      })
    );
  });

  block = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      mergeMap((userId) => {
        this.loadingService.setLoading(true)
        return this.blockService.block(userId).pipe(tap(_=>
          {
            this.loadingService.setLoading(false)
            this.location.back()
          }));
      })
    );
  });
}
