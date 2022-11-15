import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { ComponentStore } from '@ngrx/component-store';
import { UserModel } from '@shared/models/user.model';
import { AbsSearchService } from '@shared/services/abstract/search/abs-search.service';
import { map, mergeMap, Observable, of, scan, switchMap, tap } from 'rxjs';

interface SearchLayoutComponentState {
  pageNumber: number;
  users: UserModel[];
  searchKey: string;
  loading: boolean;
}

@Injectable()
export class UserSearchComponentStore extends ComponentStore<SearchLayoutComponentState> {
  constructor(
    private searchService: AbsSearchService,
    private storageService: AbsStorageService
  ) {
    super({ pageNumber: 1, users: [], searchKey: '', loading: false });
    this.search(this.pageNumber$);
    this.updateTag(this.searchKey$)
  }
  profile = this.storageService.getObject<UserModel>(this.storageService.USER);

  users$ = this.select((state) => state.users);
  private pageNumber$ = this.select((state) => state.pageNumber, {
  });
  private searchKey$ = this.select((state) => state.searchKey, {
  });
  private tweetPageSize = () => Math.floor(window.innerHeight / 50);

  end = false;
  loading$ = this.select((state) => state.loading);
  updateLoading = this.updater((state) => ({
    ...state,
    loading: !state.loading,
  }));
  updateUsers = this.updater((state, users: UserModel[]) => ({
    ...state,
    users: [...state.users, ...users],
  }));
  nextPage = this.updater((state) => ({
    ...state,
    pageNumber: this.end ? state.pageNumber : state.pageNumber + 1,
  }));

  updateSearchKey = this.updater((state, searchKey: string) => {
    this.end = false;
    return { ...state, searchKey: searchKey , users: [] };
  });

  resetPage = this.updater((state) => {
    this.end = false;
    return { ...state,pageNumber:0};
  });

  resetUser = this.updater((state)=>({...state,users:[]}))

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
          return this.searchUsers(this.tag, pageNumber);
        })
      );
    }
  );

  private searchUsers(tag: string, pageNumber: number) {
    this.updateLoading();
    return this.searchService
      .searchUser(tag, pageNumber, this.tweetPageSize())
      .pipe(
        map((res) => {
          return res.data}),
        tap((updatedValue) => {
          if (updatedValue.length < this.tweetPageSize()) this.end = true;
          this.updateLoading();
          updatedValue = updatedValue.filter((u) => u.id != this.profile.id);
          this.updateUsers(updatedValue);
        })
      );
  }
}
