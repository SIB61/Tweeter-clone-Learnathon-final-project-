import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '@shared/services/concrete/tweet/tweet.service';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { Observable, of } from 'rxjs';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsUserService } from '@shared/services/abstract/user/abs-user.service';
import { UserService } from '@shared/services/concrete/user/user.service';
import { UserModel } from '@shared/models/user.model';
import { FormsModule } from '@angular/forms';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { UserPreviewCartComponent } from '@ui/user/user-preview-cart/user-preview-cart.component';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { FollowService } from '@shared/services/concrete/user/follow.service';

@Component({
  selector: 'app-search-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserPreviewCartComponent,
    MaterialModule,
    TitleBarComponent,
    TweetViewComponent,
  ],
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
  providers: [
    { provide: AbsTweetService, useClass: TweetService },
    {
      provide: AbsUserService,
      useClass: UserService,
    },
    {
      provide: AbsFollowService,
      useClass: FollowService,
    },
  ],
})
export class SearchLayoutComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private tweetService: AbsTweetService,
    private userService: AbsUserService,
    private followService: AbsFollowService
  ) {}
  ngOnInit(): void {}

  tweetModels$: Observable<TweetModel[]> = of([]);
  userModels$: Observable<UserModel[]> = of([]);
  public searchText: string;
  isTweetSearch = true;
  search() {
    let value = this.searchText.trim();
    if (value[0] == '#') {
      value = value.slice(1, value.length);
      this.tweetModels$ = this.tweetService.searchTweet(value);
      this.isTweetSearch = true;
    } else {
      this.userModels$ = this.userService.searchUser(value, 1, 5);
      this.isTweetSearch = false;
    }
  }
  onUserAction(user: UserModel) {
    if (user.isFollow) {
      this.followService.unfollow(user.id).subscribe();
      
    }
    else this.followService.follow(user.id).subscribe();
  }
}
