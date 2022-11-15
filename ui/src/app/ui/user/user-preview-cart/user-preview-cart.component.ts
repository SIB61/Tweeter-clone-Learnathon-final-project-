import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { UserModel } from '@shared/models/user.model';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { FollowService } from '@shared/services/concrete/user/follow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserPreviewComponentStore } from './user-preview-cart.component.store';
import { PermissionComponent } from '@ui/dump/permission/permission.component';

@Component({
  selector: 'app-user-preview-cart',
  standalone: true,
  imports: [CommonModule, MaterialModule,RouterModule],
  templateUrl: './user-preview-cart.component.html',
  styleUrls: ['./user-preview-cart.component.scss'],
  providers: [UserPreviewComponentStore],
})
export class UserPreviewCartComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private store: UserPreviewComponentStore
  ) {}

  @Input() showAction=true
  
  @Input() user: UserModel;
  @Input() isBlockedUser: boolean = false
  buttonText$ = this.store.buttonText$;
  loading = false;
  ngOnInit(): void {
    if(this.isBlockedUser) this.store.updateButtonText('Unblock')
    else if(this.user.isFollow) this.store.updateButtonText('Unfollow')
    else if(!this.user.isFollow) this.store.updateButtonText('Follow')
  }

  onAction(event:string) {
    if(event==='Unblock') this.unblock()
    else if(event==='Follow') this.store.follow(this.user.id)
    else if(event==='Unfollow') this.store.unfollow(this.user.id)
  }
  unblock(){
    this.dialog.open(PermissionComponent,{data:'Unblock '+this.user.userName+'?'})
    .afterClosed().pipe(tap(
        res=>{
          if(res==='ok') {
            this.store.unBlock(this.user.id)
          }
        }
      )).subscribe()
  }
}
