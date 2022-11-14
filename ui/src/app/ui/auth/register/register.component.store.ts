import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingService } from "@core/services/concrete/loading.service";
import { ComponentStore } from "@ngrx/component-store";
import { UserModel } from "@shared/models/user.model";
import { AbsUserService } from "@shared/services/abstract/user/abs-user.service";
import { UserService } from "@shared/services/concrete/user/user.service";
import { mergeMap, Observable, switchMap, tap, using } from "rxjs";


export interface RegisterComponentState {
 isUserNameAvailable:boolean;
}

const initialState={
  isUserNameAvailable:true
}


@Injectable()
export class RegisterComponentStore extends ComponentStore<RegisterComponentState>{
  constructor(public userService:AbsUserService,private router:Router,private loadingService:LoadingService){
    super(initialState)
  }


  register = this.effect((user$:Observable<UserModel>)=>{
    return user$.pipe(switchMap(
      user=>{
        this.loadingService.setLoading(true)
        return this.userService.createUser(user).pipe(tap(res=>{
          this.loadingService.setLoading(false)
            this.router.navigateByUrl("/home")
        }))
      }
    ))
  })

}
