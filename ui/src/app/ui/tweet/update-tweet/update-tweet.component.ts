import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TweetModel } from '@shared/models/tweet.model';
import { FormsModule } from '@angular/forms';
import { AutoResizeDirective } from '@shared/directives/auto-resize.directive';
import { MaterialModule } from '@shared/material/material.module';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-update-tweet',
  standalone: true,
  imports: [CommonModule,FormsModule,AutoResizeDirective,MaterialModule],
  templateUrl: './update-tweet.component.html',
  styleUrls: ['./update-tweet.component.scss']
})
export class UpdateTweetComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:TweetModel) { }
  content= this.data.content
  tags = [] 
   
  hashTag():string{
    let tag : string = ''
    this.tags.forEach(
      t=>tag+=t+' '
    )
    tag = tag.trim()
    return tag
  }


  returnData():TweetModel
  {
    let updatedData =    this.data
    updatedData = {...updatedData,content:this.content,hashTag:this.hashTag()}
    return updatedData
  }

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  ngOnInit(): void {
    this.tags = this.data.hashTag.split(' ')
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value)?.trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }
}
