import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TweetModel } from '@shared/models/tweet.model';
import { ThousandPipe } from '@shared/pipes/thousand.pipe';
import { AbsTimelineService } from '@shared/services/abstract/tweet/abs-timeline.service';
import { TweetService } from '@shared/services/concrete/tweet/tweet.service';
import { exhaustMap, map, mergeMap, Observable, switchMap, tap, throttleTime } from 'rxjs';

interface TweetFeedComponentState {
  pageNumber: number;
  tweets: TweetModel[];
  loading: boolean;
  end:boolean
}

@Injectable()
export class TweetFeedComponentStore extends ComponentStore<TweetFeedComponentState> {
  constructor(private timelineService: AbsTimelineService) {
    super({ pageNumber: 1, tweets: [], loading: false ,end:false});
    this.loadTimeline(this.pageNumber$);
  }

  end$ = this.select(state=>state.end)
  pageNumber$ = this.select((state) => state.pageNumber);
  tweets$ = this.select((state) => state.tweets);
  loading$ = this.select((state) => state.loading);

  updateEnd = this.updater((state)=>({...state,end:!state.end}))
  updatePage = this.updater((state) => ({
    ...state,
    pageNumber: state.end? state.pageNumber:state.pageNumber+1,
  }));
  updateLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading: loading,
  }));
  updateTweets = this.updater((state, tweets: TweetModel[]) => {
    let updatedTweets = [...state.tweets,...tweets]
        console.warn(updatedTweets)
    return {
    ...state,
    tweets: updatedTweets,
  }})
  

  loadTimeline = this.effect((pageNumber$: Observable<number>) => {
    return pageNumber$.pipe(
      throttleTime(200), 
      mergeMap((pageNumber) => {
        this.updateLoading(true);
        return this.timelineService.getTimeline(pageNumber, 10).pipe(
          tap(newTweets=>{if(newTweets.length<10) this.updateEnd()
                this.updateTweets(newTweets);
                this.updateLoading(false);
        }),
        );
      })
    );
  });
}
