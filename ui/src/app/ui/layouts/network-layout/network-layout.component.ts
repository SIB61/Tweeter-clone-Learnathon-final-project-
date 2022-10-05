import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-network-layout',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './network-layout.component.html',
  styleUrls: ['./network-layout.component.scss'],
})
export class NetworkLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  links = [
    {
      label: 'Follower',
      route: '/home/network/follower',
    },
    {
      label: 'Following',
      route: '/home/network/following',
    },
  ];
  activeLink = this.links[0];
}
