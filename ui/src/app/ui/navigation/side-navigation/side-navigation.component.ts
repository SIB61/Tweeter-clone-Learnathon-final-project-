import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakPointService } from '@core/services/concrete/break-point/break-point.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faHashtag, faHome, faPerson, faUserGroup,faBell } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '@core/services/concrete/storage/storage.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';
import { AbsNotificationService } from '@shared/services/abstract/notification/abs-notification.service';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule,FontAwesomeModule],
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  providers:[{provide:AbsStorageService, useClass: StorageService}]})
export class SideNavigationComponent implements OnInit {
  breakpoints = Breakpoints;
  
  constructor(
    private router: Router,
    public breakpointService: BreakPointService,
    private storageService: AbsStorageService,
    public notificationService:AbsNotificationService
  ) {
    console.warn(router.url);
  }
  user = this.storageService.getObject<UserModel>('user')

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
    // {
    //   title: 'Profile',
    //   icon: faUser,
    //   route: '/home/profile',
    // },
  ];
}
