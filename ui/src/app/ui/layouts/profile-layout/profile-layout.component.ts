import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileCardComponent } from '@ui/user/user-profile-card/user-profile-card.component';
import { UserModel } from '@shared/models/user.model';
import { MaterialModule } from '@shared/material/material.module';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { ProfileLayoutStore } from './profile-layout.component.store';
import { AbsUserService } from '@shared/services/abstract/user/abs-user.service';
import { UserService } from '@shared/services/concrete/user/user.service';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { TweetService } from '@shared/services/concrete/tweet/tweet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { CreateTweetComponent } from '@ui/tweet/create-tweet/create-tweet.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ThousandPipe } from '@shared/pipes/thousand.pipe';
import { TweetModel } from '@shared/models/tweet.model';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [InfiniteScrollModule,CreateTweetComponent,MaterialModule,CommonModule, UserProfileCardComponent,TweetViewComponent],
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
  providers:[ProfileLayoutStore]
})
export class ProfileLayoutComponent implements OnInit {
  myId = this.storageService.getObject<UserModel>('user').id;
  
  constructor(public router:Router,public storageService: AbsStorageService,private store:ProfileLayoutStore,private route:ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.store.updateUserId(id)
    this.store.loadTweets(this.store.tweetsInfo$)
  }
  userId$ = this.store.userId$
  tweets$ = this.store.tweets$
  loading$ = this.store.loading$
  nextPage(){
   this.store.updatePageNumber()
  }
  deleted(tweet:TweetModel){
    this.store.deleteTweets(tweet.id)
  }
}
