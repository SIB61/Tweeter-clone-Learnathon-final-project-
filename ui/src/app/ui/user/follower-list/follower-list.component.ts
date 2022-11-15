import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerListComponentStore } from './follower-list.component.store';
import { UserPreviewCartComponent } from '../user-preview-cart/user-preview-cart.component';
import { MaterialModule } from '@shared/material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-follower-list',
  standalone: true,
  imports: [CommonModule,UserPreviewCartComponent,MaterialModule,InfiniteScrollModule],
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.scss'],
  providers:[FollowerListComponentStore]
})
export class FollowerListComponent implements OnInit {

  constructor(private store:FollowerListComponentStore) { }
  followers$ = this.store.followers$
  loading$ = this.store.loading$

  ngOnInit(): void {
    this.store.loadFollowers(this.store.pageNumber$)
  }
  nextPage(){
    this.store.updatePage()
  }

}
