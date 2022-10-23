import { Injectable } from "@angular/core";
import { AbsStorageService } from "@core/services/abstract/storage/abs-storage.service";
import { ComponentStore } from "@ngrx/component-store";
import { TweetModel } from "@shared/models/tweet.model";
import { UserModel } from "@shared/models/user.model";
import { AbsUserService } from "@shared/services/abstract/user/abs-user.service";
import { mergeMap, Observable, of, tap } from "rxjs";

interface UserProfileCardComponentState{
  user:UserModel,
  tweets:TweetModel[]
  id:string
}
const initialState:UserProfileCardComponentState ={
  user:{},
  tweets:[],
  id:''
}

@Injectable()
export class UserProfileCardComponentStore extends ComponentStore<UserProfileCardComponentState>{
  
 constructor(private userService:AbsUserService,private storageService:AbsStorageService){
    super({...initialState,user:storageService.getObject<UserModel>(storageService.USER)})
    this.loadUser(this.id$)
 }

 user$ = this.select(state=>state.user)
 tweets$ = this.select(state=>state.tweets)
 id$ = this.select(state=>state.id)

 updateUser = this.updater((state,user:UserModel)=>({...state,user:user}))
 updateId = this.updater((state,id:string)=>({...state,id:id}))

 loadUser = this.effect((id$:Observable<string>)=>{
  return id$.pipe(
    mergeMap(id=>this.userService.getUser(id).pipe(
        tap(user=>{
          this.storageService.setObject>(this.storageService.USER,user)
          this.updateUser(user)
        })
    ))
  )
 })

}