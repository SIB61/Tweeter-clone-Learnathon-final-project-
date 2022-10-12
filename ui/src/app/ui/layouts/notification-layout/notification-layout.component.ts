import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { AbsNotificationService } from '@shared/services/abstract/notification/abs-notification.service';
import { NotificationService } from '@shared/services/concrete/notification/notification.service';

@Component({
  selector: 'app-notification-layout',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './notification-layout.component.html',
  styleUrls: ['./notification-layout.component.scss'],
  providers: [
    { provide: AbsNotificationService, useClass: NotificationService },
  ],
})
export class NotificationLayoutComponent implements OnInit {
  constructor(public notificationService: AbsNotificationService) {}

  ngOnInit(): void {}
}
