import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { BlockListComponent } from '@ui/user/block-list/block-list.component';
import { FollowerListComponent } from '@ui/user/follower-list/follower-list.component';
import { FollowingListComponent } from '@ui/user/following-list/following-list.component';

@Component({
  selector: 'app-network-layout',
  standalone: true,
  imports: [BlockListComponent,CommonModule, MaterialModule, RouterModule,FollowerListComponent,FollowingListComponent],
  templateUrl: './network-layout.component.html',
  styleUrls: ['./network-layout.component.scss'],
})
export class NetworkLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
