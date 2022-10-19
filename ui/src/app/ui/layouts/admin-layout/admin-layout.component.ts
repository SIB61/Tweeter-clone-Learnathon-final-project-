import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { BreakPointService } from '@core/services/concrete/break-point/break-point.service';
import { Breakpoints } from '@angular/cdk/layout';
import { AdminSidebarComponent } from '@ui/navigation/admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule,CommonModule,MaterialModule,AdminSidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  drawerOpened=false;
  breakPoints=Breakpoints;
  constructor(public breakPointService:BreakPointService) { }

  ngOnInit(): void {
  }

}
