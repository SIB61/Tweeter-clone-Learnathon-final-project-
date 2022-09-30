import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { Observable } from 'rxjs';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AutoResizeDirective } from '@shared/directives/auto-resize.directive';
@Component({
  selector: 'app-create-tweet',
  standalone: true,
  imports: [CommonModule, MaterialModule, AutoResizeDirective],
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  observer: Observable<any>;
  tagDisabled = true;
  ngOnInit(): void {}
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tags = [];
  showTweet = false;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
