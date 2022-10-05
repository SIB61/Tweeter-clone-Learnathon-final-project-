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
  tags = ['We_Love_Muhammad', 'Allahuakbar'];
  addOnBlur = true;
  likes = 4;
  comments = 2;
  retweets = 1;
  ngOnInit(): void {
    console.warn(this.tweetModel);
    this.tags = this.tweetModel.hashTag;
  }
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  retweet() {
    this.retweets++;
    this.isRetweeted = true;
  }
  commnet() {}
  like() {
    this.isLiked ? this.likes-- : this.likes++;
    this.isLiked = !this.isLiked;
  }
}
