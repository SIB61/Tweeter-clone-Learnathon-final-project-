import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
