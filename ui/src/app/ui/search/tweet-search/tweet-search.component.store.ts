import { Injectable } from '@angular/core';
import { LoadingService } from '@core/services/concrete/loading.service';
import { ComponentStore } from '@ngrx/component-store';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsSearchService } from '@shared/services/abstract/search/abs-search.service';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { map, mergeMap, Observable, of, scan, tap } from 'rxjs';

interface SearchLayoutComponentState {
  pageNumber: number;
  tweets: TweetModel[];
  searchKey: string;
  loading: boolean;
}

@Injectable()
export class TweetSearchComponentStore extends ComponentStore<SearchLayoutComponentState> {
  endPage = false;
  constructor(
    private searchService: AbsSearchService,
    private tweetService: AbsTweetService,
    private loadingService: LoadingService
  ) {
    super({ pageNumber: 1, tweets: [], searchKey: '', loading: false });
    this.search(this.pageNumber$);
    this.updateTag(this.searchKey$)
  }
  end = false;
  tweets$ = this.select((state) => state.tweets);
  private pageNumber$ = this.select((state) => state.pageNumber);
  private searchKey$ = this.select((state) => state.searchKey);
  private tweetPageSize = () => Math.floor(window.innerHeight / 100);
  loading$ = this.select((state) => state.loading);
  updateLoading = this.updater((state) => ({
    ...state,
    loading: !state.loading,
  }));
  updateTweets = this.updater((state, tweets: TweetModel[]) => ({
    ...state,
    tweets: [...state.tweets, ...tweets],
  }));
  nextPage = this.updater((state) => {
    return {
      ...state,
      pageNumber: this.end ? state.pageNumber : state.pageNumber+1,
    };
  });

  updateSearchKey = this.updater((state, searchKey: string) => {
    return { ...state, searchKey: searchKey , users: [] };
  });

  resetPage = this.updater((state) => {
    return { ...state,pageNumber:0};
  });

  resetTweet = this.updater((state)=>({...state,tweets:[]}))

  resetPageToOne = this.updater((state) => {
    this.end = false;
    return { ...state,pageNumber:1};
  });

  tag=''
  updateTag = this.effect((searchKey$:Observable<string>)=>{
    return searchKey$.pipe(tap((key:string)=>{
      this.tag = key
    }))
  })


  search = this.effect(
    (pageNumber$: Observable<number>) => {
      return pageNumber$.pipe(
        mergeMap((pageNumber) => {
          if (this.tag === '') return of();
          return this.searchTweet(this.tag, pageNumber);
        })
      );
    }
  );


  private searchTweet(tag: string, pageNumber: number) {
    this.updateLoading();
    return this.searchService
      .searchTweet(tag, pageNumber, this.tweetPageSize())
      .pipe(
        map((res) =>{
         return res.data
        }),
        tap((updatedValue) => {
          if (updatedValue.length < this.tweetPageSize()) this.end = true;
          this.updateLoading();
          this.updateTweets(updatedValue);
        })
      );
  }

  removeTweet = this.updater((state, id: string) => {
    return { ...state, tweets: state.tweets.filter((t) => t.id != id) };
  });
  delete = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      mergeMap((id) => {
        this.loadingService.setLoading(true);
        return this.tweetService.delete(id).pipe(
          tap(() => {
            this.removeTweet(id);
            this.loadingService.setLoading(false);
          })
        );
      })
    );
  });
}
