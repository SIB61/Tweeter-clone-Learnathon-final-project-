import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { TweetModel } from "@shared/models/tweet.model";
import { UserModel } from "@shared/models/user.model";
import { AbsSearchService } from "@shared/services/abstract/search/abs-search.service";
import { map, mergeMap, Observable, of, scan, tap } from "rxjs";

interface SearchLayoutComponentState {
  pageNumber: number,
  tweets: TweetModel[],
  searchKey: string,
  loading: boolean,
  end: boolean
}

@Injectable()
export class TweetSearchComponentStore extends ComponentStore<SearchLayoutComponentState>{
  endPage = false;
  constructor(private searchService: AbsSearchService) {
    super({ pageNumber: 1, tweets: [], searchKey: '', loading: false, end: false })
    this.search(this.searchFilter$)
  }
  tweets$ = this.select(state => state.tweets)
  private pageNumber$ = this.select(state => state.pageNumber, { debounce: true })
  private searchKey$ = this.select(state => state.searchKey, { debounce: true })
  private tweetPageSize = () => Math.floor(window.innerHeight / 50)
  loading$ = this.select((state) => state.loading)
  searchFilter$ = this.select(
    this.pageNumber$, this.searchKey$,
    (pageNumber, searchKey) => ({ pageNumber, searchKey })
  )

  updateLoading = this.updater((state) => ({
    ...state,
    loading: !state.loading,
  }));
  updateTweets = this.updater((state, tweets: TweetModel[]) => ({ ...state, tweets: [...state.tweets, ...tweets] }))
  nextPage = this.updater((state) => {
    state.pageNumber++;
    return state
  })

  updateSearchKey = this.updater((state, searchKey: string) => ({ ...state, pageNumber: 1, searchKey: searchKey, end: false }))

  search = this.effect((searchFilter$: Observable<{ pageNumber: number, searchKey: string }>) => {
    return searchFilter$.pipe(
      mergeMap(filter => {
        this.updateLoading()
        if (filter.searchKey === '') {
          this.updateLoading()
          return of([])
        }
        else if (!this.get(state => state.end))
          return this.searchTweet(filter.searchKey, filter.pageNumber)
        this.updateLoading()
        return of([])

      }),
    )
  })

  private searchTweet(tag: string, pageNumber: number) {

    return this.searchService.searchTweet(tag, pageNumber, this.tweetPageSize())
      .pipe(
        map(res => res.data),
        tap(updatedValue => {

          this.updateLoading()
          this.updateTweets(updatedValue)
        }

        )
      )
  }

}
