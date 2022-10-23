import { keyframes, stagger, state, trigger } from "@angular/animations";
import { supportsScrollBehavior } from "@angular/cdk/platform";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { TweetModel } from "@shared/models/tweet.model";
import { UserModel } from "@shared/models/user.model";
import { AbsSearchService } from "@shared/services/abstract/search/abs-search.service";
import { map, mergeMap, Observable, of, scan, tap } from "rxjs";

interface SearchLayoutComponentState {
  pageNumber:number,
  totalPages:number,
  tweets:TweetModel[],
  users:UserModel[],
  searchKey:string,
  isTweetSearch:boolean
}

@Injectable()
export class SearchLayoutComponentStore extends ComponentStore<SearchLayoutComponentState>{
  endPage = false;
  constructor(private searchService:AbsSearchService){
    super({pageNumber:1,totalPages:2,tweets:[],users:[],searchKey:'',isTweetSearch:true})
    this.search(this.searchFilter$)
  }
  
  users$ = this.select(state=>state.users)
  tweets$ = this.select(state=>state.tweets)
  isTweetSearch$ = this.select(state=>state.isTweetSearch)
  private pageNumber$ = this.select(state=>state.pageNumber,{debounce:true})
  private searchKey$ = this.select(state=>state.searchKey,{debounce:true})
  searchFilter$ = this.select(
    this.pageNumber$,this.searchKey$,
    (pageNumber,searchKey)=>({pageNumber,searchKey})
  )

  updateUsers = this.updater((state,users:UserModel[])=>({...state,users:users}))
  updateTweets = this.updater((state,tweets:TweetModel[])=>({...state,tweets:tweets}))
  updateIsTweetSearch = this.updater((state,isTweetSearch:boolean)=>({...state,isTweetSearch:isTweetSearch}))
  nextPage = this.updater((state)=>{
    state.pageNumber++;
    return state
  })

  updateSearchKey = this.updater((state,searchKey:string)=>({...state,searchKey:searchKey}))

  search = this.effect((searchFilter$:Observable<{pageNumber:number,searchKey:string}>)=>{
    return searchFilter$.pipe(
      mergeMap(filter=>{
        if(filter.searchKey==='') return of([])
        else if(filter.searchKey.trim()[0]==='#'){
          this.updateIsTweetSearch(true)
          return this.searchTweet(filter.searchKey,filter.pageNumber)
        }
        else{
          this.updateIsTweetSearch(false)
          return this.searchUser(filter.searchKey,filter.pageNumber)
        }
      }),
    )
  })

  private searchUser(name:string,pageNumber:number){
    return this.searchService.searchUser(name,pageNumber,20)
    .pipe(
        map(res=>res.data),
        scan((acc,curr)=>([...acc,...curr]),[]),
        tap(updatedValue=>this.updateUsers(updatedValue))
      )
  }
  private searchTweet(tag:string,pageNumber:number){
    return this.searchService.searchTweet(tag,pageNumber,20)
    .pipe(
        map(res=>res.data),
        scan((acc,curr)=>([...acc,...curr]),[]),
        tap(updatedValue=>this.updateTweets(updatedValue))
      )
  }

}
