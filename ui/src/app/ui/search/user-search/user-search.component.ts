import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserModel } from '@shared/models/user.model';
import { UserPreviewCartComponent } from '@ui/user/user-preview-cart/user-preview-cart.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserSearchComponentStore } from './user-search.component.store';
import { MaterialModule } from '@shared/material/material.module';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [MaterialModule,CommonModule,UserPreviewCartComponent,InfiniteScrollModule],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: [UserSearchComponentStore]
})
export class UserSearchComponent implements OnInit ,OnChanges{
  @Input() searchKey:string


  constructor(private store:UserSearchComponentStore) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchKey']){
      this.store.resetUser()
      this.store.updateSearchKey('')
      this.store.resetPage()
      this.store.updateSearchKey(changes['searchKey'].currentValue)
      this.store.resetPageToOne()
    }
  }
  isLoading$ = this.store.loading$

  userModels$ : Observable<UserModel[]>  = this.store.users$
  ngOnInit(): void {
    this.store.updateSearchKey(this.searchKey)
  }
  nextPage(){
   this.store.nextPage()
  }

}
