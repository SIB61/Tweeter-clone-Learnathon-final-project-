import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModel } from '@shared/models/notification.model';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-notification-view',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule,TimeagoModule],
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent implements OnInit {
  @Input() notification:NotificationModel

  constructor() { }

  ngOnInit(): void {
  }


  routerLink():string{

    return this.notification.type === 'FOLLOW' ? '/home/profile/' + this.notification.from
       : '/home/tweet/'+this.notification.postId
  }

}
