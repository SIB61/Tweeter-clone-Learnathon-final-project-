import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { Observable, retry } from 'rxjs';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AutoResizeDirective } from '@shared/directives/auto-resize.directive';
import { FormsModule } from '@angular/forms';
import { TweetModel } from '@shared/models/tweet.model';
import { AbsTweetService } from '@shared/services/abstract/tweet/abs-tweet.service';
import { TweetService } from '@shared/services/concrete/tweet/tweet.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';
@Component({
  selector: 'app-create-tweet',
  standalone: true,
  imports: [CommonModule, MaterialModule, AutoResizeDirective, FormsModule],
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  constructor(
    private tweetService: AbsTweetService,
    private storageService: AbsStorageService
  ) {}

  isOpen = false;
  observer: Observable<any>;
  tagDisabled = true;
  ngOnInit(): void {}
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tags = [];
  showProgress = false;
  showTweet = false;
  @Input() content: string = '';
  @Output() submit = new EventEmitter<string>();
  localUser = this.storageService.getObject<UserModel>('user');

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

  tweet() {
    this.showProgress = true;
    let hashTag: string = '';
    for (let i in this.tags) hashTag += this.tags[i] + ' ';
    hashTag = hashTag.trim();
    this.tweetService
      .tweet({ content: this.content, hashTag: hashTag })
      .subscribe({
        next: (_) => {
          this.showProgress = false;
          (this.content = ''), (this.tags = []);
        },
        error: (_) => {
          this.showProgress = false;
        },
      });
  }

  onSubmit() {
    this.submit.emit(this.content);
  }
}
