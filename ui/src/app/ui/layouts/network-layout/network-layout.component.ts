import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-network-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './network-layout.component.html',
  styleUrls: ['./network-layout.component.scss']
})
export class NetworkLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
