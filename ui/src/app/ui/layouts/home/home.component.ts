import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { SideNavigationComponent } from '@ui/navigation/side-navigation/side-navigation.component';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakPointService } from '@core/services/break-point/break-point.service';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleBarComponent,
    CommonModule,
    RouterModule,
    MaterialModule,
    SideNavigationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  breakpoints = Breakpoints;
  constructor(public breakPoint: BreakPointService, public router: Router) {}
  ngOnInit(): void {}
}
