import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { LoadingService } from '@core/services/concrete/loading.service';
import { ComponentStore } from '@ngrx/component-store';
import { TweetModel } from '@shared/models/tweet.model';
import { UserModel } from '@shared/models/user.model';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { mergeMap, Observable, tap } from 'rxjs';

interface ProfileLayoutState {
  userId:string
  tweets: TweetModel[];
  loading: boolean;
  end:boolean;
  pageNumber: number;
}

@Injectable()
export class ProfileLayoutStore extends ComponentStore<ProfileLayoutState> {
  constructor(
    private tweetService: AbsTweetService,
    private loadingService:LoadingService
  ) {
    super({
      userId:'',
      end:false,
      tweets: [],
      loading: false,
      pageNumber: 1,
    });
  }


  pageNumber$ = this.select(state=>state.pageNumber)
  userId$ = this.select(state=>state.userId)
  tweets$ = this.select((state) => state.tweets);
  end$ = this.select(state=>state.end)
  loading$ = this.select(state=>state.loading);
  

  tweetsInfo$ = this.select(this.pageNumber$,this.userId$,(pageNumber,userId)=>({pageNumber,userId}))

  pageSize = () => Math.floor(window.innerHeight/200)

  updatePageNumber = this.updater((state)=>({...state,pageNumber:this.get(state=>state.end)?state.pageNumber : state.pageNumber+1}))

  setPage = this.updater((state,pageNumber:number)=>({...state,pageNumber:pageNumber}))
  setTweets = this.updater((state,tweets:TweetModel[])=>({...state,tweets:tweets}))

  resetPageNumber = this.updater((state)=>({...state,pageNumber:1}))
  updateLoading = this.updater(state=>({...state,loading:!state.loading}))
  updateTweets = this.updater((state,value:TweetModel[])=>{
     return {...state, tweets: [...state.tweets, ...value]}
  })
  removeTweet = this.updater((state,id:string)=>{
     return {...state,tweets:state.tweets.filter(t=>t.id!=id)} 
  })
  delete=this.effect((id$:Observable<string>)=>{
    return id$.pipe(mergeMap(id=>{
      this.loadingService.setLoading(true)
      return this.tweetService.delete(id).pipe(tap(()=>{
        this.removeTweet(id)
        this.loadingService.setLoading(false)
      })) 
    }))
  })
  updateUserId = this.updater((state,value:string)=>({...state,userId:value}))
  updateEnd = this.updater(state=>({...state,end : !state.end}))

  loadTweets = this.effect((tweetInfo$: Observable<{pageNumber:number,userId:string}>) => {
    return tweetInfo$.pipe(
      mergeMap((tweetInfo) => {
        this.updateLoading()
        return this.tweetService.getUserTweets(
          tweetInfo.userId,
          tweetInfo.pageNumber,
          this.pageSize()
        ).pipe(tap(tweets=>{
          if(tweets.length<this.pageSize()) this.updateEnd()
          this.updateTweets(tweets)
          this.updateLoading()
        }));
      })
    );
  });

}
