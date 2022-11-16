

import { Injectable } from '@angular/core';
import { LoadingService } from '@core/services/concrete/loading.service';
import { ComponentStore } from '@ngrx/component-store';
import { TweetModel } from '@shared/models/tweet.model';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { mergeMap, mergeMapTo, Observable, tap } from 'rxjs';


interface State {
    tweet: TweetModel
    parentTweet: TweetModel,
}

@Injectable()
export class TweetViewComponentStore extends ComponentStore<State>{
    constructor(private loadingService:LoadingService,private tweetActionService : AbsTweetActionService,private tweetService:AbsTweetService) {
        super({tweet:{},parentTweet:{}})
     }

     updateParentTweet = this.updater((state,parentTweet:TweetModel)=>({...state,parentTweet:parentTweet}))
     updateTweet = this.updater((state,tweet:TweetModel)=>({...state,tweet:{...state.tweet,...tweet}}))

     tweet$ = this.select(state=>state.tweet)
     parentTweet$ = this.select(state=>state.parentTweet)

     retweet = this.effect((id$:Observable<string>) => {
        return id$.pipe(
            mergeMap(id=>{
                return this.tweetActionService.retweet(id)
            })
        )
     })

     
     like = this.effect((id$:Observable<string>) => {
        return id$.pipe(
            mergeMap(id=>{
                return this.tweetActionService.like(id)
            })
        )
     })


     unlike = this.effect((id$:Observable<string>) => {
        return id$.pipe(
            mergeMap(id=>{
                return this.tweetActionService.unlike(id)
            })
        )
     })
    
     comment = this.effect((comment$:Observable<CommentModel>) => {
        return comment$.pipe(
            mergeMap(comment=>{
             this.loadingService.setLoading(true)
                return this.tweetActionService.comment(comment).pipe(tap(()=>{
          this.loadingService.setLoading(false)
        }))
            })
        )
     })

  delete=this.effect((id$:Observable<string>)=>{
    return id$.pipe(mergeMap(id=>{
      this.loadingService.setLoading(true)
      return this.tweetService.delete(id).pipe(tap(()=>{
        this.loadingService.setLoading(false)
      })) 
    }))
  })

  update = this.effect((tweet$:Observable<TweetModel>)=>{
     return tweet$.pipe(mergeMap(tweet=>{
      this.loadingService.setLoading(true)
      this.updateParentTweet(tweet)
      return this.tweetService.update(tweet.id,tweet).pipe(tap(()=>{
        this.loadingService.setLoading(false)
      }))
    }))
  })
}
