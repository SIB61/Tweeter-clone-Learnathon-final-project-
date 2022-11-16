import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { LoadingService } from '@core/services/concrete/loading.service';
import { ComponentStore } from '@ngrx/component-store';
import { TweetModel } from '@shared/models/tweet.model';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { UserModel } from '@shared/models/user.model';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { mergeMap, Observable, tap, throttleTime } from 'rxjs';

interface State {
  loading: boolean;
  comments: CommentModel[];
  pageNumber: number;
  tweet: TweetModel;
  tweetId: string;
}

@Injectable()
export class CommentsLayoutComponentStore extends ComponentStore<State> {
  constructor(
    private tweetActionService: AbsTweetActionService,
    private tweetService: AbsTweetService,
    private loadingService: LoadingService,
    private storageService: AbsStorageService
  ) {
    super({
      loading: false,
      comments: [],
      pageNumber: 1,
      tweet: {},
      tweetId: '',
    });
  }
  profile = this.storageService.getObject<UserModel>(this.storageService.USER)
  loading$ = this.select((state) => state.loading);
  pageNumber$ = this.select((state) => state.pageNumber);
  comments$ = this.select((state) => state.comments);
  tweetId$ = this.select((state) => state.tweetId);
  tweet$ = this.select((state) => state.tweet);
  end = false



  updateTweet = this.updater((state, tweet: TweetModel) => ({
    ...state,
    tweet: tweet,
  }));

  updateComments = this.updater((state, comments: CommentModel[]) => ({
    ...state,
    comments: [...state.comments, ...comments],
  }));

  appendComment = this.updater((state, comments: CommentModel[]) => ({
    ...state,
    comments: [...comments,...state.comments],
  }));
  removeComment = 
  this
  .updater((state,comment:CommentModel)=>{
    let updatedComments:CommentModel[] = state.comments.filter(c=>c.id!=comment.id)
    return {...state,comments:updatedComments}
  })
  updateLoading = this.updater((state) => ({
    ...state,
    loading: !state.loading,
  }));
  updatePageNumber = this.updater((state) => ({
    ...state,
    pageNumber: this.end ? state.pageNumber : state.pageNumber=1,
  }));
  updateId = this.updater((state, id: string) => ({ ...state, tweetId: id }));

  loadComments = this.effect((pageNumber$: Observable<number>) => {
    return pageNumber$.pipe(
      throttleTime(200),
      mergeMap((pageNumber) => {
        this.updateLoading();
        return this.tweetActionService
          .loadComments(this.get().tweetId, pageNumber, 10)
          .pipe(
            tap((newComments) => {
              if (newComments.length < 10) this.end == false;
              this.updateComments(newComments);
              this.updateLoading();
            })
          );
      })
    );
  });

  sendComment = this.effect((comment$: Observable<string>) => {
    return comment$.pipe(
      mergeMap((comment) => {
        this.loadingService.setLoading(true)
        return this.tweetActionService
          .comment({ tweetId: this.get().tweetId, content: comment })
          .pipe(tap(res=>{
            console.log(res)
            this.loadingService.setLoading(false)
            let newComment:CommentModel = {content:comment,userId:this.profile.id,tweetId:'',userName:this.profile.userName,fullName:this.profile.fullName,createdAt:new Date().toISOString() }
            console.log(newComment)
            this.appendComment([newComment])
          }));
      })
    );
  });

  loadTweet = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      mergeMap((id) => {
        return this.tweetService.getTweet(id).pipe(
          tap((tweet) => {
            console.log(tweet);
            this.updateTweet(tweet);
          })
        );
      })
    );
  });

  delete = this.effect((comment$:Observable<CommentModel>)=>{
    return comment$.pipe(mergeMap(comment=>{
      this.loadingService.setLoading(true)
    return this.tweetActionService.deleteComment(comment.id).pipe(tap(()=>{
        this.loadingService.setLoading(false)
        this.removeComment(comment)
      }))
    }))
  })
}
