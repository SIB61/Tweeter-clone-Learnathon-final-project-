import { Component, Inject, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-comment',
  standalone: true,
  imports: [CommonModule,MaterialModule,FormsModule],
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.scss']
})
export class UpdateCommentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : string) { }
  comment = this.data

  ngOnInit(): void {
  }

}
