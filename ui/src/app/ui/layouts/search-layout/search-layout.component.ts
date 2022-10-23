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
import { SearchLayoutComponentStore } from './search-layout.component.store';
import { AbsSearchService } from '@shared/services/abstract/search/abs-search.service';
import { SearchService } from '@shared/services/concrete/search/search.service';
import { ComponentStore } from '@ngrx/component-store';

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
    {
      provide: AbsFollowService,
      useClass: FollowService,
    },
    {
      provide:AbsSearchService,
      useClass:SearchService
    },
    SearchLayoutComponentStore
  ],
})
export class SearchLayoutComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private followService: AbsFollowService,
    private componentStore:SearchLayoutComponentStore
  ) {}
  tweetModels$: Observable<TweetModel[]> 
  userModels$: Observable<UserModel[]> 
  isTweetSearch$ : Observable<boolean>
  ngOnInit(): void {
    this.tweetModels$ = this.componentStore.tweets$
    this.userModels$ = this.componentStore.users$
    this.isTweetSearch$ = this.componentStore.isTweetSearch$
  }
  public searchText: string='';
  search() {
    let value = this.searchText.trim();
    if(value.length>0)
    this.componentStore.updateSearchKey(value)
  }
  onUserAction(user: UserModel) {
    if (user.isFollow) {
      this.followService.unfollow(user.id).subscribe();
    }
    else this.followService.follow(user.id).subscribe();
  }
}
