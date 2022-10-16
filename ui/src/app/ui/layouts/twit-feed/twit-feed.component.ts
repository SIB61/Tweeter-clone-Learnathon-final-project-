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
  animations: [slideInRightAnimation()],
})
export class TwitFeedComponent implements OnInit, AfterViewInit {
  pageOffset = new BehaviorSubject(1);
  tweetModels$: Observable<TweetModel[]>;
  isEnd: boolean = false;
  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport;
  isLoading = false;
  constructor(
    public tweetService: AbsTweetService,
    public timeLineService: AbsTimelineService,
    public route: ActivatedRoute,
    private ngZone: NgZone
  ) { }
  ngOnInit(): void {
    this.pageOffset.next(1);
    const _tweetModels = this.pageOffset.pipe(
      mergeMap((pageNumber) => this.loadTimeline(pageNumber)),
      scan((acc, curr) => {
        console.warn(acc);
        return { ...acc, ...curr };
      }, {})
    );
    this.tweetModels$ = _tweetModels.pipe(map((obj) => Object.values(obj)));
  }

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map((_) => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 100),
        throttleTime(1000)
      )
      .subscribe((_) => {
        this.ngZone.run(() => this.nextPage());
      });
  }

  loadTimeline(pageNumber: number): Observable<TweetModel> {
    if (pageNumber < 1) pageNumber = 1;
    this.isLoading = true;
    return this.timeLineService.getTimeline(pageNumber, 5).pipe(
      tap((arr) => {
        this.isLoading = false;
        arr.length ? null : (this.isEnd = true);
      }),
      map((arr) => {
        return arr.reduce((acc, cur) => {
          const id = cur.id;
          const data = cur;
          return { ...acc, [id]: data };
        }, {});
      })
    );
  }
  nextPage() {
    if (!this.isEnd) this.pageOffset.next(this.pageOffset.value + 1);
  }

  trackByIdx(i) {
    return i;
  }
}
