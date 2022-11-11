import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { NotificationModel } from '@shared/models/notification.model';
import { PageResponse } from '@shared/models/structures/response.model';
import { TokenModel } from '@shared/models/token.model';
import { UserModel } from '@shared/models/user.model';
import { AbsNotificationService } from '@shared/services/abstract/notification/abs-notification.service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationService implements AbsNotificationService {

  newNotification = new BehaviorSubject<NotificationModel>({})

  newNotification$: Observable<NotificationModel> = this.newNotification.asObservable();

  myProfile=this.storageService.getObject<UserModel>(this.storageService.USER)

  constructor(private storageService:AbsStorageService,private httpService:AbsHttpService){
    this.createConnection()
  }

  private hubConnection:HubConnection

  getNotifications(pageNumber:number,pageSize:number): Observable<NotificationModel[]> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    return this.httpService.get(ApiEndpoints.NOTIFICATION,params).pipe(map(
      (res:PageResponse<NotificationModel[]>)=> {
       return res.data
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

    this.hubConnection.on('NewMessage', message => {
      console.log(message+ "new")
      this.newNotification.next(message)
    })
  }

  stopConnecton(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
