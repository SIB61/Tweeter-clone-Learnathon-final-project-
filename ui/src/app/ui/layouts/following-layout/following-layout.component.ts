import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPreviewCartComponent } from '@ui/user/user-preview-cart/user-preview-cart.component';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { Observable } from 'rxjs';
import { UserModel } from '@shared/models/user.model';
import { RouterModule } from '@angular/router';
import { FollowService } from '@shared/services/concrete/user/follow.service';

@Component({
  selector: 'app-following-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, UserPreviewCartComponent],
  templateUrl: './following-layout.component.html',
  styleUrls: ['./following-layout.component.scss'],
  providers: [{ provide: AbsFollowService, useClass: FollowService }],
})
export class FollowingLayoutComponent implements OnInit {
  constructor(private followService: AbsFollowService) {}
  followings$: Observable<UserModel[]>;
  ngOnInit(): void {
    this.followings$ = this.followService.getFollowings('');
  }
}
