import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { CommentModel } from "@shared/models/tweet/comment.model";
import { AbsTweetActionService } from "@shared/services/abstract/tweet/abs-tweet-action.service";
import { mergeMap, Observable } from "rxjs";


interface State{}

@Injectable()
export class CommentViewComponentStore extends ComponentStore<State>{
  constructor(private tweetActionService:AbsTweetActionService){
  super()
  }
  delete = this.effect((id$:Observable<string>)=>{
    return id$.pipe(mergeMap(id=>{
   return this.tweetActionService.deleteComment(id)
    }))
  })
  update = this.effect((comment$:Observable<CommentModel>)=>{
    return comment$.pipe(
      mergeMap(
        comment =>
      {
        return this.tweetActionService.updateComment(comment.id,comment.content)
      }
      )
    )
  })
}
