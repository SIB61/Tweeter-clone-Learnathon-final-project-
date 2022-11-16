import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbsHttpCacheService } from '@core/services/abstract/http/abs-http-cache.service';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { NotificationModel } from '@shared/models/notification.model';
import { PageResponse } from '@shared/models/structures/response.model';
import { TokenModel } from '@shared/models/token.model';
import { UserModel } from '@shared/models/user.model';
import { AbsNotificationService } from '@shared/services/abstract/notification/abs-notification.service';
import { rubberBandAnimation } from 'angular-animations';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationService implements AbsNotificationService {

  notificationAlartCount = new BehaviorSubject(0)

  resetNotificationAlartCount(): void {
     this.notificationAlartCount.next(0) 
  }

  notificationAlartCount$: Observable<number> = this.notificationAlartCount.asObservable();

  newNotification = new BehaviorSubject<NotificationModel>({})

  newNotification$: Observable<NotificationModel> = this.newNotification.asObservable();

  myProfile=this.storageService.getObject<UserModel>(this.storageService.USER)

  constructor(private router:Router,private httpCacheService: AbsHttpCacheService,private storageService:AbsStorageService,private httpService:AbsHttpService){
    this.createConnection()
  }


  private hubConnection:HubConnection

  getNotifications(pageNumber:number,pageSize:number): Observable<NotificationModel[]> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    return this.httpService.get(ApiEndpoints.NOTIFICATION,params).pipe(map(
      (res:PageResponse<NotificationModel[]>)=> {
       return res.data.filter(v=>v.from!=this.myProfile.id)
      }
    ))
  }

  createConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.base_url+'hubs/notification' + '?userId=' + this.myProfile.id, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => this.storageService.getObject<TokenModel>(this.storageService.TOKEN)?.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection
      .start()
      .catch(error => console.log(error))

    this.hubConnection.on('NewMessage', (message:NotificationModel) => {

      if(this.router.url != '/home/notification')
      this.notificationAlartCount.next(this.notificationAlartCount.value+1)
      if(this.myProfile.id!=message.from)
      this.newNotification.next(message)

      this.httpCacheService.clear()
    })
  }

  stopConnecton(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
