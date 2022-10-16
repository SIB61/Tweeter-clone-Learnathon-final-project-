import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permisson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permisson.component.html',
  styleUrls: ['./permisson.component.scss']
})
export class PermissonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
