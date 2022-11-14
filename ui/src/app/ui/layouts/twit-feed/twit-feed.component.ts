import {
  AfterViewInit,
  Component,
  importProvidersFrom,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CreateTweetComponent } from '@ui/tweet/create-tweet/create-tweet.component';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  pairwise,
  reduce,
  scan,
  switchAll,
  switchMap,
  take,
  tap,
  throttle,
  throttleTime,
} from 'rxjs';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { TweetService } from '@shared/services/concrete/tweet/tweet.service';
import { AbsTimelineService } from '@shared/services/abstract/tweet/abs-timeline.service';
import { TimeLineService } from '@shared/services/concrete/tweet/timeline.service';
import { TweetModel } from '@shared/models/tweet.model';
import { slideInRightAnimation } from 'angular-animations';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TwitFeedComponentStore } from './twit-feed.component.store';

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
    TwitFeedComponentStore,
  ],
  animations: [slideInRightAnimation()],
})
export class TwitFeedComponent    {
  tweetModels$ = this.store.tweets$;
  isLoading$ = this.store.loading$;
  constructor(
    private store: TwitFeedComponentStore
  ) {
  }

  nextPage() {
    this.store.updatePage()
  }
  delete(tweet:TweetModel){
    this.store.delete(tweet.id)
  }
}
