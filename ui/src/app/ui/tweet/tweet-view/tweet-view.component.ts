import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { TweetModel } from '@shared/models/tweet.model';

@Component({
  selector: 'app-tweet-view',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.scss'],
})
export class TweetViewComponent implements OnInit {
  constructor() {}
  @Input() public tweetModel: any;
  isLiked = true;
  isRetweeted = false;
  tags = [];
  addOnBlur = true;
  likes = 4;
  comments = 2;
  retweets = 1;
  panelOpenState = false;
  isExpanded = false;
  s = true;
  ngOnInit(): void {
    console.warn(this.tweetModel);
    let hashTag: string = this.tweetModel.hashTag;
    this.tags = hashTag.split(' ');
  }

  retweet() {
    this.retweets++;
    this.isRetweeted = true;
  }
  commnet() {
    this.isExpanded = !this.isExpanded;
  }
  like() {
    this.isLiked ? this.likes-- : this.likes++;
    this.isLiked = !this.isLiked;
  }

  change() {}
}
