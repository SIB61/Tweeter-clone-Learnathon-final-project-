import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-send-code',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule],
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let i
  }

}
