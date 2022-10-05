import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { TitleBarComponent } from '@ui/navigation/title-bar/title-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-layout',
  standalone: true,
  imports: [CommonModule, MaterialModule, TitleBarComponent],
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
})
export class SearchLayoutComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}
}
