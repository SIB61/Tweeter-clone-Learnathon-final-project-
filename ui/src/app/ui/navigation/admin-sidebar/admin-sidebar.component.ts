import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  lastClicked=0;

  constructor() { }

  ngOnInit(): void {
  }

  options=[
    {
      text:"Users",
      link: "/admin"
    },
    {
      text:"Block List",
      link: "/admin"
    }
  ]

}
