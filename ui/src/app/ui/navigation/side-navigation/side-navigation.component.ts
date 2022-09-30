import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { BreakPointService } from '@core/services/break-point/break-point.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  breakpoints = Breakpoints;
  constructor(
    private router: Router,
    public breakpointService: BreakPointService
  ) {
    console.warn(router.url);
  }

  isSelected(route: string): boolean {
    return this.router.url == route;
  }

  ngOnInit(): void {}

  navList = [
    {
      title: 'Home',
      icon: 'home',
      route: '/home/tweet-feed',
    },
    {
      title: 'Explore',
      icon: 'tag',
      route: '/home/search',
    },
    {
      title: 'Notification',
      icon: 'notifications',
      route: '/home/notification',
    },
    {
      title: 'Profile',
      icon: 'person',
      route: '/home/profile',
    },
    {
      title: 'Network',
      icon: 'group',
      route: '/home/network',
    },
  ];
}
