import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CreateTweetComponent } from '@ui/tweet/create-tweet/create-tweet.component';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TweetService } from '@shared/services/tweet/tweet.service';
import { AbsTweetService } from '@shared/abs-services/tweet/abs-tweet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-twit-feed',
  standalone: true,
  imports: [
    InfiniteScrollModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    CreateTweetComponent,
    TweetViewComponent,
    TitleBarComponent,
  ],
  templateUrl: './twit-feed.component.html',
  styleUrls: ['./twit-feed.component.scss'],
  providers: [
    {
      provide: AbsTweetService,
      useClass: TweetService,
    },
  ],
})
export class TwitFeedComponent implements OnInit {
  constructor(
    public tweetService: AbsTweetService,
    public route: ActivatedRoute
  ) {}
  tweetModels$: Observable<any>;
  ngOnInit(): void {
    this.loadTweet(1);
  }
  currentPage = 1;
  loadTweet(pageNumber: number) {
    if (pageNumber < 1) pageNumber = 1;
    this.tweetModels$ = this.tweetService.getTimeline(pageNumber, 5);
  }
  onScrollDown() {
    console.warn('scrolled');
    this.tweetModels$ = this.tweetService.getTimeline(this.currentPage + 1, 5);
    this.currentPage++;
  }
  onScrollUp() {
    if (this.currentPage > 1) {
      this.tweetModels$ = this.tweetService.getTimeline(
        this.currentPage - 1,
        5
      );
      this.currentPage--;
    }
  }
}
