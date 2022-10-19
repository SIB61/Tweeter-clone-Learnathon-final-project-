import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakPointService } from '@core/services/concrete/break-point/break-point.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faHashtag, faHome, faPerson, faUserGroup,faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '@shared/services/concrete/notification/-notification.service';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule,FontAwesomeModule],
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
    return this.router.url.startsWith(route);
  }

  ngOnInit(): void {}

  navList = [
    {
      title: 'Home',
      icon: faHome,
      route: '/home/tweet-feed',
    },
    {
      title: 'Explore',
      icon: faHashtag,
      route: '/home/search',
    },
    {
      title: 'Notification',
      icon: faBell,
      route: '/home/notification'
    },
    {
      title: 'Network',
      icon: faUserGroup,
      route: '/home/network',

    },
    {
      title: 'Profile',
      icon: faUser,
      route: '/home/profile',
    },
  ];
}
