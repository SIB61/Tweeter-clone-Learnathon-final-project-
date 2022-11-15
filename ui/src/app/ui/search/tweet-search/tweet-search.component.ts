import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { Observable } from 'rxjs';
import { TweetModel } from '@shared/models/tweet.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TweetSearchComponentStore } from './tweet-search.component.store';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-tweet-search',
  standalone: true,
  imports: [MaterialModule,CommonModule,TweetViewComponent,InfiniteScrollModule],
  templateUrl: './tweet-search.component.html',
  styleUrls: ['./tweet-search.component.scss'],
  providers: [TweetSearchComponentStore]
})
export class TweetSearchComponent implements OnInit , OnChanges{

  @Input() searchKey : string

  constructor(private store:TweetSearchComponentStore) { 
    
  }
  ngOnChanges(changes: SimpleChanges): void {
   if(changes['searchKey']){
      this.store.resetTweet()
      this.store.updateSearchKey('')
      this.store.resetPage()
      this.store.updateSearchKey(changes['searchKey'].currentValue)
      this.store.resetPageToOne()
    } 
  }
  isLoading$ = this.store.loading$
  tweetModels$:Observable<TweetModel[]> = this.store.tweets$
  ngOnInit(): void {
  }

  nextPage(){
    this.store.nextPage()
  }

  deleted(tweet:TweetModel){
    this.store.delete(tweet.id)
  }
}
