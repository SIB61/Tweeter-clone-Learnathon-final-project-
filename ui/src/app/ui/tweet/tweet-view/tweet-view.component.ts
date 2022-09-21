import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tweet-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tweet-view.component.html',
  styleUrls: ['./tweet-view.component.scss']
})
export class TweetViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
