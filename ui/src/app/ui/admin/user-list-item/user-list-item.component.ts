import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
