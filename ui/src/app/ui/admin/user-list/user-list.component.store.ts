import { Injectable } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ComponentStore } from "@ngrx/component-store";
import { UserModel } from "@shared/models/user.model";
import { AbsAdminService } from "@shared/services/abstract/admin/abs-admin.service";
import { AbsSearchService } from "@shared/services/abstract/search/abs-search.service";
import { debounce, exhaustMap, filter, mergeMap, Observable, switchMap, take, tap } from "rxjs";

export interface UserListState {
  users: UserModel[]
  pageFromUi: PageEvent
  pageFromApi: PageEvent
  filter: string
}
const initialState: UserListState = {
  users: [],
  pageFromUi: { pageIndex: 0, pageSize: 10, length: 0 },
  pageFromApi: { pageIndex: 0, pageSize: 10, length: 0 },
  filter: 'All'
}



@Injectable()
export class UserListComponentStore extends ComponentStore<UserListState>{

  users$ = this.select(state => state.users)
  private pageFromUi$ = this.select(state => state.pageFromUi, { debounce: true })
  pageFromApi$ = this.select(state => state.pageFromApi, { debounce: true })
  filter$ = this.select(state => state.filter, { debounce: true })

  loadUserData$ = this.select(
    this.pageFromUi$,
    this.filter$,
    (page, filter) => ({ page, filter })
  )

  constructor(private adminService: AbsAdminService, private snackbar: MatSnackBar,private searchService:AbsSearchService) {
    super(initialState)
    this.load(this.loadUserData$)
  }


  updatePageFromUi = this.updater((state, page: PageEvent) => ({ ...state, pageFromUi: page }))
  private updatePageFromApi = this.updater((state, page: PageEvent) => ({ ...state, pageFromApi: page }))
  updateFilter = this.updater((state, filter: string) => ({ ...state, filter: filter }))
  private updateUser = this.updater((state, users: UserModel[]) => ({ ...state, users: users }))
  private updateUserData = this.updater((state, user: UserModel) => {
    let users = state.users.map((value) => { return value.id === user.id ? user : value })
    return { ...state, users: users }
  })

  block = this.effect((user$: Observable<UserModel>) => {
    return user$.pipe(
      exhaustMap(user => {
        if (!user.isBlock)
          return this.adminService.block(user.id).pipe(tap(_ => {
            this.snackbar.open(`Blocked ${user.userName}`, '', { duration: 2000 })
            user.isBlock = true
            this.updateUserData(user)
          }))
        else return this.adminService.unblock(user.id).pipe(tap(_ => {
          this.snackbar.open(`Unblocked ${user.userName}`, '', { duration: 2000 })
          user.isBlock = false 
          this.updateUserData(user)
        }))
      })
    )
  })

  update = this.effect((user$: Observable<UserModel>) => {
    return user$.pipe(
      exhaustMap(user => {
        return this.adminService.updateUser(user.id, {dateOfBirth:user.dateOfBirth,fullName:user.fullName}).pipe(tap(_ => {
          this.snackbar.open(`Updated ${user.userName}`, '', { duration: 2000 })
          this.updateUserData(user)
        }),
        )
     })
    )
  })

  load = this.effect((loadUserData$: Observable<{ page: PageEvent, filter: string }>) => {
    return loadUserData$.pipe(
      mergeMap((data) => {
        return this.adminService.getUsers(data.filter, data.page.pageIndex + 1, data.page.pageSize).pipe(tap(
          response => {this.updateUser(response.data); this.updatePageFromApi({ pageIndex: response.pageNumber - 1, pageSize: response.pageSize, length: response.totalRecords }) }
        )
        )
      })
    )
  })
 
  // search = this.effect((key$:Observable<string>)=>{
  //   return key$.pipe(switchMap(key=>{
  //     return this.searchService.searchUser(key)
  //   }))
  // })

}

