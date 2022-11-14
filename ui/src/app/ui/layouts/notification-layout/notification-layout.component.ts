import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { NotificationModel } from '@shared/models/notification.model';
import { PageEvent } from '@angular/material/paginator';
import { TimeagoModule } from 'ngx-timeago';
import { AbsNotificationService } from '@shared/services/abstract/notification/abs-notification.service';
import { NotificationLayoutComponentStore } from './notification-layout.component.store';
import { Observable } from 'rxjs';
import { NotificationViewComponent } from '@ui/notification/notification-view/notification-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


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
  imports: [CommonModule, MaterialModule, TimeagoModule, NotificationViewComponent, InfiniteScrollModule],
  templateUrl: './notification-layout.component.html',
  styleUrls: ['./notification-layout.component.scss'],
  providers:[NotificationLayoutComponentStore]
})
export class NotificationLayoutComponent implements OnInit {
  notifications$:Observable<NotificationModel[]>
  loading$:Observable<boolean>
  constructor(private store:NotificationLayoutComponentStore) {}
  ngOnInit(): void {
   this.notifications$ = this.store.notifications$ 
    this.loading$ = this.store.loading$
  }
  nextPage(){
    this.store.updatePageNumber()
  }
}
