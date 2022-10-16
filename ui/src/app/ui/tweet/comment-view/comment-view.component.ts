import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { MaterialModule } from '@shared/material/material.module';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-comment-view',
  standalone: true,
  imports: [MaterialModule, CommonModule,TimeagoModule],
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
})
export class CommentViewComponent implements OnInit {
  constructor() {}

  @Input() comment: CommentModel = {};
  ngOnInit(): void {
    console.warn(this.comment)
  }
}
