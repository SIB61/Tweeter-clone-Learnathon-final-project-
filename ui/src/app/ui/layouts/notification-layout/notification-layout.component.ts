import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-layout.component.html',
  styleUrls: ['./notification-layout.component.scss']
})
export class NotificationLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
