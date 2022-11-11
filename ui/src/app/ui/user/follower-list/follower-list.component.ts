import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-follower-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.scss']
})
export class FollowerListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
