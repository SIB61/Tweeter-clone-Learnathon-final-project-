import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { NotificationModel } from "@shared/models/notification.model";
import { AbsNotificationService } from "@shared/services/abstract/notification/abs-notification.service";
import { concat, mergeMap, Observable, tap} from "rxjs";

interface State{
  notifications:NotificationModel[],
  pageNumber:number
  loading:boolean
}
@Injectable()
export class NotificationLayoutComponentStore extends ComponentStore<State>{
  constructor(private notificationService:AbsNotificationService){
    super({notifications:[],loading:false,pageNumber:1})
    notificationService.resetNotificationAlartCount()
    this.loadNotifications(this.pageNumber$)
    this.onNewNotifications()
  }
  notifications$ = this.select(state=>state.notifications)
  loading$ = this.select(state=>state.loading)
  pageNumber$ = this.select(state=>state.pageNumber)
  pageSize = () => Math.floor(window.innerHeight/50)

  updateLoading = this.updater(state=>({...state,loading:!state.loading}))
  updatePageNumber = this.updater((state)=>({...state,pageNumber:state.pageNumber+1}))
  resetNotifications = this.updater((state)=>({...state,notifications:[]}))
  updateNotifications = this.updater((state,value:NotificationModel[])=>{
    let newNotificationState = [...new Set(value.concat(state.notifications))]
    return {...state,notifications:newNotificationState}
  })
  
  loadNotifications = this.effect((pageNumber$:Observable<number>)=>{
    return pageNumber$.pipe(mergeMap(pageNumber=>{
      if(pageNumber==1) this.resetNotifications()
      this.updateLoading()
      return this.notificationService.getNotifications(pageNumber,this.pageSize())
      .pipe(tap(notifications=>{
          this.updateNotifications(notifications)    
          this.updateLoading()
        }))
    }))
  })

  onNewNotifications = this.effect(_=>{
    return this.notificationService.newNotification$.pipe(tap((notification:NotificationModel)=>{
       this.notificationService.resetNotificationAlartCount()
       this.updateNotifications([notification])     
    }))
  })
}
