import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { SideNavigationComponent } from '@ui/navigation/side-navigation/side-navigation.component';
import { Breakpoints } from '@angular/cdk/layout';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';
import { BreakPointService } from '@core/services/concrete/break-point/break-point.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { SideUserComponent } from '@ui/user/side-user/side-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleBarComponent,
    CommonModule,
    RouterModule,
    MaterialModule,
    SideNavigationComponent,
    DragDropModule,
    SideUserComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  breakpoints = Breakpoints;
  user:UserModel
  innerHeight = window.innerHeight
  constructor(public breakPoint: BreakPointService, public router: Router,private storageService:AbsStorageService) {
    this.user = storageService.getObject<UserModel>('user')
  }
  ngOnInit(): void {}
}
