import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { TweetActionService } from '@shared/services/concrete/tweet/tweet-action.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  filter,
  map,
  mergeMap,
  Observable,
  pairwise,
  scan,
  switchMap,
  take,
  tap,
  throttleTime,
} from 'rxjs';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { CommentViewComponent } from '@ui/tweet/comment-view/comment-view.component';
import { MaterialModule } from '@shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommentsLayoutComponentStore } from './comments-layout.component.store';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { TweetModel } from '@shared/models/tweet.model';

@Component({
  selector: 'app-comments-layout',
  standalone: true,
  imports: [
    CommentViewComponent,
    MaterialModule,
    CommonModule,
    RouterModule,
    FormsModule,
    InfiniteScrollModule,
    TweetViewComponent,
  ],
  templateUrl: './comments-layout.component.html',
  styleUrls: ['./comments-layout.component.scss'],
  providers: [
    // { provide: AbsTweetActionService, useClass: TweetActionService },
    CommentsLayoutComponentStore,
  ],
})
export class CommentsLayoutComponent implements OnInit, OnDestroy {
  commentText: string;
  constructor(
    private route: ActivatedRoute,
    private store: CommentsLayoutComponentStore,
    private location: Location,
    router: Router
  ) {
    this.tweet = router.getCurrentNavigation().extras.state;
  }
  tweet: TweetModel;

  ngOnInit(): void {
    let id: string;
    this.route.params
      .pipe(
        take(1),
        tap((params) => {
          id = params['id'];
          this.store.updateId(id);
          this.store.loadComments(this.store.pageNumber$);
        })
      )
      .subscribe();
    if (!this.tweet) {
      this.store.loadTweet(id);
    } else this.store.updateTweet(this.tweet);
  }

  deleted(comment:CommentModel){
    this.store.delete(comment)
  }

  ngOnDestroy(): void {}

  loading$ = this.store.loading$;
  comments$ = this.store.comments$;
  tweet$ = this.store.tweet$;

  sendComment() {
    let comment = this.commentText;
    this.commentText = '';
    if (comment != '') {
      this.store.sendComment(comment);
    }
  }

  onScroll() {
    console.error('scrolling');
    this.store.updatePageNumber();
  }

  back() {
    this.location.back();
  }
}
