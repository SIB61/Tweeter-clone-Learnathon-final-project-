import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingListComponentStore } from './following-list.component.store';
import { UserPreviewCartComponent } from '../user-preview-cart/user-preview-cart.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-following-list',
  standalone: true,
  imports: [CommonModule,UserPreviewCartComponent,MaterialModule ,InfiniteScrollModule],
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.scss'],
  providers:[FollowingListComponentStore]
})
export class FollowingListComponent implements OnInit {
  constructor(private store:FollowingListComponentStore) { }
  followings$ = this.store.followings$
  loading$ = this.store.loading$

  ngOnInit(): void {
    this.store.loadFollowings(this.store.pageNumber$)
  }
  nextPage(){
    this.store.updatePage()
  }

}
