import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CreateTweetComponent } from '@ui/tweet/create-tweet/create-tweet.component';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { TweetService } from '@shared/services/concrete/tweet/tweet.service';
import { AbsTimelineService } from '@shared/services/abstract/tweet/abs-timeline.service';
import { TimeLineService } from '@shared/services/concrete/tweet/timeline.service';

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
    {
      provide: AbsTimelineService,
      useClass: TimeLineService,
    },
  ],
})
export class TwitFeedComponent implements OnInit {
  constructor(
    public tweetService: AbsTweetService,
    public TimeLineService: AbsTimelineService,
    public route: ActivatedRoute
  ) {}
  tweetModels$: Observable<any>;
  currentPage = 1;
  ngOnInit(): void {
    this.loadTimeline();
  }
  loadTimeline() {
    if (this.currentPage < 1) this.currentPage = 1;
    this.tweetModels$ = this.TimeLineService.getTimeline(this.currentPage);
  }
  onScrollDown() {
    this.currentPage++;
    this.loadTimeline();
  }
  onScrollUp() {
    this.currentPage--;
    this.loadTimeline();
  }
}
