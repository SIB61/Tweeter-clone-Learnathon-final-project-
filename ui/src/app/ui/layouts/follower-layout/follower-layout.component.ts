import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPreviewCartComponent } from '@ui/user/user-preview-cart/user-preview-cart.component';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FollowService } from '@shared/services/concrete/user/follow.service';
import { AbsLocalUserInfoService } from '@shared/services/abstract/user/abs-local-user-info.service';

@Component({
  selector: 'app-follower-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, UserPreviewCartComponent],
  templateUrl: './follower-layout.component.html',
  styleUrls: ['./follower-layout.component.scss'],
  providers: [{ provide: AbsFollowService, useClass: FollowService }],
})
export class FollowerLayoutComponent implements OnInit {
  constructor(
    private followService: AbsFollowService,
    private localUserInfo: AbsLocalUserInfoService
  ) {}
  followers$: Observable<any>;
  ngOnInit(): void {
    this.followers$ = this.followService.getFollowers(
      this.localUserInfo.getLocalUser().id
    );
  }
}
