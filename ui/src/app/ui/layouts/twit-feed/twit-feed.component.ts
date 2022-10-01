import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CreateTweetComponent } from '@ui/tweet/create-tweet/create-tweet.component';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';

@Component({
  selector: 'app-twit-feed',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CreateTweetComponent,
    TweetViewComponent,
    TitleBarComponent,
  ],
  templateUrl: './twit-feed.component.html',
  styleUrls: ['./twit-feed.component.scss'],
})
export class TwitFeedComponent implements OnInit {
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
