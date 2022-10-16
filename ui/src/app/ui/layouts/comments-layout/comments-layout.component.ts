import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { TweetActionService } from '@shared/services/concrete/tweet/tweet-action.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-comments-layout',
  standalone: true,
  imports: [
    CommentViewComponent,
    MaterialModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './comments-layout.component.html',
  styleUrls: ['./comments-layout.component.scss'],
  providers: [{ provide: AbsTweetActionService, useClass: TweetActionService }],
})
export class CommentsLayoutComponent implements OnInit, AfterViewInit {
  id: string;
  _pageNumber = new BehaviorSubject<number>(1);
  isEnd = false;
  pageSize: number = 5;
  commentText: string;
  pageOffset = new BehaviorSubject<number>(1);
  comments$: Observable<CommentModel[]>;
  @ViewChild(CdkVirtualScrollViewport)
  scroller: CdkVirtualScrollViewport;
  isLoading = false;
  constructor(
    private tweetActionService: AbsTweetActionService,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        take(1),
        tap((params) => (this.id = params['id']))
      )
      .subscribe();
    this.comments$ = this.pageOffset.pipe(
      tap((_) => (this.isLoading = true)),
      mergeMap((pageNumber) =>
        this.tweetActionService.loadComments(this.id, pageNumber, this.pageSize)
      ),
      scan((acc, curr) => {
        console.warn(acc, curr);
        if (curr.length == 0) {
          this.isEnd = true;
        }
        this.isLoading = false;
        return acc.concat(curr);
      }, [])
    );
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
        if (!this.isEnd)
          this.ngZone.run(() => {
            this.pageOffset.next(this.pageOffset.value + 1);
          });
      });
  }

  sendComment() {
    let comment = this.commentText;
    this.commentText = '';
    if (comment != '') {
      this.tweetActionService
        .comment({ tweetId: this.id, content: comment })
        .pipe(
          tap((_) =>
            this.ngZone.run(() => {
              this.pageOffset.next(1);
            })
          )
        )
        .subscribe();
    }
  }
}
