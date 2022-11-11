import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FollowerLayoutComponent } from '../follower-layout/follower-layout.component';
import { FollowingLayoutComponent } from '../following-layout/following-layout.component';
import { BlockListComponent } from '@ui/user/block-list/block-list.component';

@Component({
  selector: 'app-network-layout',
  standalone: true,
  imports: [BlockListComponent,CommonModule, MaterialModule, RouterModule,FollowerLayoutComponent,FollowingLayoutComponent],
  templateUrl: './network-layout.component.html',
  styleUrls: ['./network-layout.component.scss'],
})
export class NetworkLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
