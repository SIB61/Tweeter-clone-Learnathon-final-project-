import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tweet-view',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.scss'],
})
export class TweetViewComponent implements OnInit {
  constructor() {}
  isLiked = true;
  isRetweeted = false;
  tags = ['We_Love_Muhammad', 'Allahuakbar'];
  addOnBlur = true;
  ngOnInit(): void {}
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
