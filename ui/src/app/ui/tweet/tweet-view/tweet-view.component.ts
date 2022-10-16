import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { TweetActionService } from '@shared/services/concrete/tweet/tweet-action.service';
import { FormsModule } from '@angular/forms';
import { slideInRightAnimation, slideInUpAnimation } from 'angular-animations';
import { TimeagoModule } from 'ngx-timeago';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import {faHeart,faComment} from '@fortawesome/free-regular-svg-icons'
import {faRetweet} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-tweet-view',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule,TimeagoModule],
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.scss'],
  providers: [{ provide: AbsTweetActionService, useClass: TweetActionService }],
  animations:[slideInRightAnimation()]
})
export class TweetViewComponent implements OnInit {
  constructor(public tweetActionService: AbsTweetActionService,private tweetService: AbsTweetService) {}
  live=false
  faHeart = faHeart
  faRetweet = faRetweet
  faComment = faComment
  @Input() public tweetModel: TweetModel = {};
  tweet:TweetModel;
  isLiked = true;
  isClamp=true;
  isRetweeted = false;
  tags = [];
  addOnBlur = true;
  likes = 4;
  commentText: string;
  comments = 2;
  retweets = 1;
  panelOpenState = false;
  isExpanded = false;
  commentList$: Observable<any>;
  ngOnInit(): void {
    if(this.tweetModel.isRetweet)
    this.tweet = this.tweetModel.parentTweet;
    else this.tweet = this.tweetModel
    this.tags = this.tweet.hashTag.split(' ');
    this.isLiked = this.tweet.isLiked;
    this.likes = this.tweet.totalLikes;
    this.comments = this.tweet.totalComments;
    this.retweets = this.tweet.totalRetweets;
  }

  retweet() {
    this.tweet.totalRetweets++;
    this.tweetActionService
      .retweet(this.tweet.id)
      .subscribe({ next: (data) => console.warn(data) });
  }
  comment() {
    this.isExpanded = !this.isExpanded;
  }
  like() {
    this.isLiked ? this.tweet.totalLikes-- : this.tweet.totalLikes++;
    this.isLiked = !this.isLiked;
    this.isLiked
      ? this.tweetActionService.like(this.tweetModel.id).subscribe()
      : this.tweetActionService.unlike(this.tweetModel.id).subscribe();
  }

  sendComment() {
    this.tweet.totalComments++
    let comment = this.commentText
    this.commentText = ''
    if (comment != '') {
      this.tweetActionService
        .comment({ tweetId: this.tweet.id, content: comment })
        .subscribe();
    }
  }
  change() {}
}
