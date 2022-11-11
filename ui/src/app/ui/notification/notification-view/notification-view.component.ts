import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModel } from '@shared/models/notification.model';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-notification-view',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent implements OnInit {
  @Input() notification:NotificationModel

  constructor() { }

  ngOnInit(): void {
  }

}
