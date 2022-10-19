import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { NotificationService } from '@shared/services/concrete/notification/-notification.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { PNotification } from '@shared/models/notification.model';
import { PageEvent } from '@angular/material/paginator';
import { TimeagoModule } from 'ngx-timeago';


export interface UserModel {
  id?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  dateOfBirth?: string;
  totalFollowers?: number;
  totalFollowings?: number;
  totalTweets?: number;
  createdAt?: Date;
  role?: string;
  following?: string;
  password?: string;
  repeatedPassword?: string;
  isFollow?: boolean;
}


@Component({
  selector: 'app-notification-layout',
  standalone: true,
  imports: [CommonModule, MaterialModule, TimeagoModule],
  templateUrl: './notification-layout.component.html',
  styleUrls: ['./notification-layout.component.scss']
})



export class NotificationLayoutComponent implements OnInit {

  PNotification : PNotification;
 
  constructor(public notificationService: NotificationService, private storageService: AbsStorageService) {}

  ngOnInit(): void {
    
    const user: UserModel = JSON.parse(localStorage.getItem('user'));

    this.notificationService.loadNotification(1,5).subscribe(res => {
      this.PNotification = res;
      this.notificationService.notificationThreadSource.next(this.PNotification.data);
      if(this.PNotification.data.length > 0){
        this.notificationService.showNotification = true;
      }
    });
    console.log(user.id);
    this.notificationService.createHubConnection(user.id);
    
  }




  loadNotification(pageNumber: number, pageSize: number)
  {
    this.notificationService.loadNotification(pageNumber, pageSize).subscribe(res => {
      this.notificationService.notificationThreadSource.next(res.data);
    })
  }

   // used to build a slice of papers relevant at any given time
   public getPaginatorData(event: PageEvent): PageEvent {
    console.log(event);
    this.loadNotification(event.pageIndex+1,event.pageSize);
    return event;
  }
}
