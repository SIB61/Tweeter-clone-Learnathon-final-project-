import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { AbsBlockService } from "@shared/services/abstract/user/abs-block.service";
import { AbsFollowService } from "@shared/services/abstract/user/abs-follow.service";
import { BlockService } from "@shared/services/concrete/user/block.service";
import { mergeMap, Observable } from "rxjs";
interface State{
  buttonText:'Follow'|'Unfollow'|'Unblock'
}
@Injectable()
export class UserPreviewComponentStore extends ComponentStore<State>{
  constructor( private blockService: AbsBlockService,private followService: AbsFollowService){
    super({buttonText:'Follow'})
  }
  buttonText$ = this.select(state=>state.buttonText)
  updateButtonText = this.updater((state,text:'Follow'|'Unfollow'|'Unblock')=>({...state,buttonText:text}))

  unBlock=this.effect((userId$:Observable<string>)=>{
    return userId$.pipe(mergeMap(userId=>{
     this.updateButtonText('Follow')  
      return this.blockService.unblock(userId)
    }))
  })

  follow= this.effect((userId$:Observable<string>)=>{
    return userId$.pipe(mergeMap(userId=>{
      this.updateButtonText('Unfollow')
      return this.followService.follow(userId)
    }))
  })
  
  unfollow= this.effect((userId$:Observable<string>)=>{
    return userId$.pipe(mergeMap(userId=>{
      this.updateButtonText('Follow')
      return this.followService.unfollow(userId)
    }))
  })
}
