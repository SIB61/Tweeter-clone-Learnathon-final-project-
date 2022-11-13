import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPreviewCartComponent } from '@ui/user/user-preview-cart/user-preview-cart.component';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FollowService } from '@shared/services/concrete/user/follow.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-follower-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, UserPreviewCartComponent, InfiniteScrollModule],
  templateUrl: './follower-layout.component.html',
  styleUrls: ['./follower-layout.component.scss'],
  // providers: [{ provide: AbsFollowService, useClass: FollowService }],
})
export class FollowerLayoutComponent implements OnInit {
  constructor(
    private followService: AbsFollowService,
    private storageService: AbsStorageService
  ) {}
  
  followers$: Observable<any>;
  ngOnInit(): void {
    this.followers$ = this.followService.getFollowers(
      this.storageService.getObject<UserModel>('user')?.id
    );
  }
}
