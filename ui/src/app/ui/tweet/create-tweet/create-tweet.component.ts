import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { Observable, retry } from 'rxjs';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AutoResizeDirective } from '@shared/directives/auto-resize.directive';
import { FormsModule } from '@angular/forms';
import { TweetModel } from '@shared/models/tweet.model';
import { TweetService } from '@shared/services/tweet/tweet.service';
import { AbsTweetService } from '@shared/abs-services/tweet/abs-tweet.service';
import { AbsLocalUserService } from '@shared/abs-services/user/abs-local-user.service';
import { LocalUserInfoService } from '@shared/services/user/local-user-info.service';
@Component({
  selector: 'app-create-tweet',
  standalone: true,
  imports: [CommonModule, MaterialModule, AutoResizeDirective, FormsModule],
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
  providers: [
    { provide: AbsTweetService, useClass: TweetService },
    {
      provide: AbsLocalUserService,
      useClass: LocalUserInfoService,
    },
  ],
})
export class CreateTweetComponent implements OnInit {
  observer: Observable<any>;
  tagDisabled = true;
  ngOnInit(): void {}
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tags = [];
  showProgress = false;
  showTweet = false;
  content: string = '';
  constructor(
    private tweetService: AbsTweetService,
    private localUserService: AbsLocalUserService
  ) {}
  localUser = this.localUserService.getLocalUser();

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
}
