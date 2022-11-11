import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-following-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.scss']
})
export class FollowingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
