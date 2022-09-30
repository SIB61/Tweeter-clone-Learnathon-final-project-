import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-title-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
