import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { PNotification, UNotification } from '@shared/models/notification.model';
import { TokenModel } from '@shared/models/token.model';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  
  private hubConnection : HubConnection;
  public notificationThreadSource = new BehaviorSubject<UNotification[]>([]);
  public numOfunreadNotification:any;
  showNotification = false;

  notificationThread$ = this.notificationThreadSource.asObservable();

  constructor(private http:HttpClient, private storageService: AbsStorageService) { 


  }

  loadNotification(pageNumber: number, pageSize: number)
  {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    

    console.log("PageNumber " + pageNumber);

    return this.http.get<PNotification>("https://localhost:7228/notification", {params}).pipe(
      map(res => {
        return res;
      })
    )
  }

  countnumOfunreadNotification()
  {
    return this.http.get<any>("https://localhost:7228/notification/unread-notification").pipe(
      map(res => {
        return res.data as number;
      })
    )
  }



  // this is signalR partR
  createHubConnection( userId: string) {    

    this.numOfunreadNotification  = this.countnumOfunreadNotification();

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7089/hubs/notification' + '?userId=' + userId, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.storageService.getObject<TokenModel>('token')?.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection
      .start()
      .catch(error => console.log(error))


    this.hubConnection.on('NewMessage', message => {
      console.log("MY new message" + message.type);

      this.showNotification = true;
      this.notificationThread$.pipe(take(1)).subscribe(messages=>{
        // this.notificationThreadSource.next([...messages, message]);
        this.notificationThreadSource.next([message, ...messages]);
      })
    })
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.notificationThreadSource.next(null);
      this.hubConnection.stop();
    }
    // this.hubConnection.stop().catch(error => console.log(error));
  }
}
