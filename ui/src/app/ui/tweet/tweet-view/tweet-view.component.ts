import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsTweetActionService } from '@shared/services/abstract/tweet/abs-tweet-action.service';
import { Observable } from 'rxjs';
import { TweetActionService } from '@shared/services/concrete/tweet/tweet-action.service';

@Component({
  selector: 'app-tweet-view',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.scss'],
  providers: [{ provide: AbsTweetActionService, useClass: TweetActionService }],
})
export class TweetViewComponent implements OnInit {
  constructor(public tweetActionService: AbsTweetActionService) {}
  @Input() public tweetModel: TweetModel;
  isLiked = true;
  isRetweeted = false;
  tags = [];
  addOnBlur = true;
  likes = 4;
  comments = 2;
  retweets = 1;
  panelOpenState = false;
  isExpanded = false;
  commentList$: Observable<any>;
  ngOnInit(): void {
    console.warn(this.tweetModel);
    let hashTag: string = this.tweetModel.hashTag;
    this.tags = hashTag.split(' ');
    this.isLiked = this.tweetModel.isLiked;
    this.likes = this.tweetModel.totalLikes;
    this.comments = this.tweetModel.totalComments;
    this.retweets = this.tweetModel.totalRetweets;
    this.commentList$ = this.tweetActionService.loadComments(
      this.tweetModel.id
    );
  }

  retweet() {
    this.retweets++;
    this.tweetActionService.retweet(this.tweetModel.id).subscribe();
  }
  commnet() {
    this.isExpanded = !this.isExpanded;
  }
  like() {
    this.isLiked ? this.likes-- : this.likes++;
    this.isLiked = !this.isLiked;
    this.isLiked
      ? this.tweetActionService.like(this.tweetModel.id).subscribe()
      : this.tweetActionService.unlike(this.tweetModel.id).subscribe();
  }

  change() {}
}
