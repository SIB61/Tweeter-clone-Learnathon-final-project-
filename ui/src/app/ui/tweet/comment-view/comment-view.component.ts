import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModel } from '@shared/models/tweet/comment.model';
import { MaterialModule } from '@shared/material/material.module';
import { TimeagoModule } from 'ngx-timeago';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCommentComponent } from '../update-comment/update-comment.component';
import { tap } from 'rxjs';
import { CommentViewComponentStore } from './comment-view.component.store';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';

@Component({
  selector: 'app-comment-view',
  standalone: true,
  imports: [MaterialModule, CommonModule,TimeagoModule],
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
  providers:[CommentViewComponentStore]
})
export class CommentViewComponent implements OnInit {
  constructor(private dialog:MatDialog,private store:CommentViewComponentStore,private storageService:AbsStorageService) {}
  
  myUser = this.storageService.getObject<UserModel>(this.storageService.USER)

  @Input() comment: CommentModel = {};
  @Output() deleted = new EventEmitter()
  ngOnInit(): void {
    console.warn(this.comment)
  }
  delete(){
   this.store.delete(this.comment.id)
    this.deleted.emit()

  }
  update(){
    this.dialog.open(UpdateCommentComponent,{data:this.comment.content,width:'50vw',minWidth:'300px'}).afterClosed().pipe(
      tap(res=>{
        if(res){
        let updatedComment = this.comment
        console.log(res)
        updatedComment = {...updatedComment,content:res}
        if(updatedComment!=this.comment){
        this.store.update(updatedComment) 
        this.comment = updatedComment
          }
        }
      })
    ).subscribe()
  }
}
