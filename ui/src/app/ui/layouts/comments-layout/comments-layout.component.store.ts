import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { CommentModel } from "@shared/models/tweet/comment.model";
import { AbsTimelineService } from "@shared/services/abstract/tweet/abs-timeline.service";
import { AbsTweetActionService } from "@shared/services/abstract/tweet/abs-tweet-action.service";
import { TweetActionService } from "@shared/services/concrete/tweet/tweet-action.service";
import { mergeMap, Observable, tap, throttleTime } from "rxjs";

interface State {
   loading:boolean,
   comments:CommentModel[],
   pageNumber:number,
   end:boolean,
   tweetId:string
}

@Injectable()
export class CommentsLayoutComponentStore extends ComponentStore<State>{
  
   constructor(private tweetActionService : AbsTweetActionService){
super({loading:false ,comments:[],end:false,pageNumber:1,tweetId:""})
   }
   loading$ = this.select(state=>state.loading)
   pageNumber$ = this.select(state=>state.pageNumber)
   comments$ = this.select(state=>state.comments)
   tweetId$ = this.select(state=>state.tweetId)

  updateComments = this.updater((state,comments:CommentModel[])=>({...state,comments:[...state.comments,...comments]}))
  updateLoading = this.updater((state)=>({...state,loading:!state.loading}))
  updateEnd = this.updater((state)=>({...state,end:!state.end}))
  updatePageNumber = this.updater((state,next:boolean)=>({...state,pageNumber:next?state.pageNumber+1:state.pageNumber}))
  updateId = this.updater((state,id:string)=>({...state,tweetId:id}))

  loadComments = this.effect((pageNumber$: Observable<number>) => {
    return pageNumber$.pipe(
      throttleTime(200), 
      mergeMap((pageNumber) => {
        this.updateLoading();
        return this.tweetActionService.loadComments(this.get().tweetId,pageNumber, 10).pipe(
          tap(newComments=>{if(newComments.length<10) this.updateEnd()
                this.updateComments(newComments);
                this.updateLoading();
        }),
        );
      })
    );
  });


  sendComment = this.effect((comment$:Observable<string>)=>{
   return comment$.pipe(
     mergeMap(comment=>{
     return  this.tweetActionService
        .comment({tweetId:this.get().tweetId,content:comment})
        .pipe(
        )
     })
   )
  })
   
}