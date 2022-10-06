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
  ],
})
export class SearchLayoutComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private tweetService: AbsTweetService,
    private userService: AbsUserService
  ) {}
  ngOnInit(): void {}

  tweetModels$: Observable<TweetModel[]> = of([]);
  userModels$: Observable<UserModel[]> = of([]);
  public searchText: string;

  isTweetSearch = true;

  search() {
    let value = this.searchText.trim();
    if (value[0] == '#') {
      this.tweetModels$ = this.tweetService.searchTweet('We_Love_Bangladesh');
      this.isTweetSearch = true;
    } else {
      this.userModels$ = this.userService.searchUser(value, 1, 5);
      this.isTweetSearch = false;
    }
  }
}
