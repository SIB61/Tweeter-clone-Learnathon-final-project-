import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public title:string) { }

  ngOnInit(): void {
  }

}
