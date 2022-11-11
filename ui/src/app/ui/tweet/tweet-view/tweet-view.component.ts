import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { TweetViewComponentStore } from './tweet-view.component.store';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { PermissionComponent } from '@ui/dump/permission/permission.component';
@Component({
  selector: 'app-tweet-view',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    TimeagoModule,
  ],
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.scss'],
  providers: [TweetViewComponentStore],
  animations: [slideInRightAnimation()],
})
export class TweetViewComponent implements OnInit {
  constructor(
    private store: TweetViewComponentStore,
    public tweetActionService: AbsTweetActionService,
    private tweetService: AbsTweetService,
    private storageService:AbsStorageService,
    private dialog:MatDialog
  ) {}
  myProfile = this.storageService.getObject<UserModel>(this.storageService.USER)
  live = false;
  faHeart = faHeart;
  faRetweet = faRetweet;
  faComment = faComment;
  @Input() public tweetModel: TweetModel = {};
  @Output() public deleted : EventEmitter<void> = new EventEmitter()
  isClamp = true;
  commentText: string;
  isExpanded = false;
  ngOnInit(): void {
    if (this.tweetModel.isRetweet) {
      this.store.updateParentTweet(this.tweetModel.parentTweet);
      this.store.updateTweet(this.tweetModel);
    } else {
      this.store.updateParentTweet(this.tweetModel);
      this.store.updateTweet(this.tweetModel);
    }
  }
  tweet$ = this.store.tweet$;
  parentTweet$ = this.store.parentTweet$;
  like(tweet: TweetModel) {
    if (tweet.isLiked) {
      this.store.updateParentTweet({ totalLikes: tweet.totalLikes - 1 });
      this.store.unlike(tweet.id)
    } else {
      this.store.updateParentTweet({ totalLikes: tweet.totalLikes + 1 });
      this.store.like(tweet.id)
    }
    this.store.updateParentTweet({ isLiked: !tweet.isLiked });
  }
  comment(tweet: TweetModel) {
    if (this.commentText) {
      this.store.updateParentTweet({ totalComments: tweet.totalComments + 1 });
      this.store.comment({ tweetId: tweet.id, content: this.commentText });
      this.commentText = null
      this.isExpanded =! this.isExpanded
    }
  }
  retweet(tweet: TweetModel) {
    this.store.updateParentTweet({ totalRetweets: tweet.totalRetweets + 1 });
    this.store.retweet(tweet.id);
  }


  edit(){
   
  }
  delete(tweet:TweetModel){
     this.dialog.open(PermissionComponent,{data:"Are you sure to delete?"}).afterClosed().pipe(tap(res=>{
      if(res==="ok"){
        console.log("deleted")
        this.store.delete(tweet.id)
        this.deleted.emit()
      }
    })).subscribe()
  }
  change() {}
}
