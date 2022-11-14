import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TweetViewComponent } from '@ui/tweet/tweet-view/tweet-view.component';
import { UserPreviewCartComponent } from '@ui/user/user-preview-cart/user-preview-cart.component';
import { UserSearchComponent } from '@ui/search/user-search/user-search.component';
import { TweetSearchComponent } from '@ui/search/tweet-search/tweet-search.component';

@Component({
  selector: 'app-search-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserPreviewCartComponent,
    MaterialModule,
    TitleBarComponent,
    TweetViewComponent,
    UserSearchComponent,
    TweetSearchComponent
    
  ],
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
})
export class SearchLayoutComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    
  }

  tweetSearch = false
 
  searchText = ''
  
  searchKey = ''

  search(){
    if(this.searchText.length>=0)
    if(this.searchText[0]==='#'){
      this.searchKey = this.searchText
      this.tweetSearch = true
    }
    else{
      this.tweetSearch = false
      this.searchKey = this.searchText
    }
  }
}
