import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
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
    private location: Location
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
  updateId = this.updater((state, id: string) => ({ ...state, id: id }));

  loadUser = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      mergeMap((id) =>
        this.userService.getUser(id).pipe(
          tap((user) => {
            this.updateUserState(user);
          })
        )
      )
    );
  });

  updateUser = this.effect((user$: Observable<UserModel>) => {
    return user$.pipe(
      mergeMap((user) => {
        this.updateUserState(user);
        return this.userService.updateUser(user).pipe(
          tap((_) => {
            this.snackbar.open('updated successfully', 'ok', {
              duration: 3000,
            });
          })
        );
      })
    );
  });

  follow = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      mergeMap((userId) => {
        return this.followService.follow(userId).pipe(
          catchError((err) => {
            this.updateUserState({ isFollow: false });
            return err;
          })
        );
      })
    );
  });

  unfollow = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      mergeMap((userId) => {
        return this.followService.unfollow(userId).pipe(
          catchError((err) => {
            this.updateUserState({ isFollow: true });
            return err;
          })
        );
      })
    );
  });

  block = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      mergeMap((userId) => {
        this.location.back()
        return this.blockService.block(userId);
      })
    );
  });
}
