import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserPreviewCartComponent } from '../user-preview-cart/user-preview-cart.component';
import { BlockListComponentStore } from './block-list.component.store';
import { UserModel } from '@shared/models/user.model';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-block-list',
  standalone: true,
  imports: [MaterialModule,CommonModule,InfiniteScrollModule,UserPreviewCartComponent],
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
  providers:[BlockListComponentStore]
})
export class BlockListComponent implements OnInit {

  constructor(private store:BlockListComponentStore) { }
  blockList$ = this.store.blockList$
  loading$ = this.store.loading$

  ngOnInit(): void {

  }

  nextPage(){
    this.store.updatePageNumber()
  }

  unblock(user:UserModel){
    this.store.removeUser(user)
  }

}
