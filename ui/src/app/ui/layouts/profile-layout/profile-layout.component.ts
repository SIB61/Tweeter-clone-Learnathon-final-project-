import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileCardComponent } from '@ui/user/user-profile-card/user-profile-card.component';
import { UserModel } from '@shared/models/user.model';
import { AbsLocalUserInfoService } from '@shared/services/abstract/user/abs-local-user-info.service';
import { MaterialModule } from '@shared/material/material.module';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [MaterialModule,CommonModule, UserProfileCardComponent,TweetViewComponent],
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
})
export class ProfileLayoutComponent implements OnInit {
  user: UserModel;
  constructor(public localUserInfoService: AbsLocalUserInfoService) {}
  ngOnInit(): void {
    this.user = this.localUserInfoService.getLocalUser();
  }
}
