import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-varify-code',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule],
  templateUrl: './varify-code.component.html',
  styleUrls: ['./varify-code.component.scss']
})
export class VarifyCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
