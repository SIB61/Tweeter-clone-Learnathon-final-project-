
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { UserModel } from '@shared/models/user.model';
import { Observable, take, tap } from 'rxjs';
import { UserProfileCardComponentStore } from './user-profile-card.component.store';
import { ThousandPipe } from '@shared/pipes/thousand.pipe';
import { faCalendar, faEdit, faEnvelope, faLongArrowAltUp, faPen } from '@fortawesome/free-solid-svg-icons';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '@ui/dump/user-update/user-update.component';
import { Router } from '@angular/router';
import { PermissionComponent } from '@ui/dump/permission/permission.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule, MaterialModule,ThousandPipe],
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss'],
  providers: [UserProfileCardComponentStore],
})
export class UserProfileCardComponent implements OnInit , OnChanges {
  @Input() userId: string;
  faEdit = faPen
  myId = this.storageService.getObject<UserModel>(this.storageService.USER).id
  faEmail = faEnvelope
  faDate = faCalendar
  user$: Observable<UserModel>;
  constructor(private dialog: MatDialog,private userProfileComponentStore:UserProfileCardComponentStore,private storageService:AbsStorageService,private router:Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userId']){
    this.userProfileComponentStore.updateId(changes['userId'].currentValue)
    }
  }
  ngOnInit(): void {
    this.user$ = this.userProfileComponentStore.user$
    this.userProfileComponentStore.updateId(this.userId)
    this.userProfileComponentStore.loadUser(this.userProfileComponentStore.id$)
  }
  update(user:UserModel){
    this.dialog.open(UserUpdateComponent,{data:user,disableClose:true}).afterClosed().subscribe(result => {
      if(result){
      let updatedUser = user
      updatedUser.dateOfBirth = result.dateOfBirth
      updatedUser.fullName = result.fullName
        if(updatedUser!=user)
       this.userProfileComponentStore.updateUser(updatedUser)
      }
    });
  }
  logout(){
    this.dialog.open(PermissionComponent,{data:"Do you want to log out?"}).afterClosed().subscribe(res=>{
      if(res==="ok"){
      this.storageService.clear()
      this.router.navigateByUrl("/account/sign-in")  
      }
    })
  }
 
  changePassword(user:UserModel){
    this.dialog.open(ChangePasswordComponent).afterClosed().subscribe(res=>{
      if(res){
        this.userProfileComponentStore.updatePassword(res)
      }
    })
  }




  follow(userId:string){
    this.userProfileComponentStore.updateUserState({ isFollow: true });
    this.userProfileComponentStore.follow(userId)
  }
  unfollow(userId:string){
    this.userProfileComponentStore.updateUserState({ isFollow: false });
    this.userProfileComponentStore.unfollow(userId)
  }

  block(userId:string){
    this.dialog.open(PermissionComponent,{data:"Are you sure to block ?"}).afterClosed().pipe(
      take(1),
      tap(res=>{
        if(res==='ok'){
          this.userProfileComponentStore.block(userId)
        }
      })
    ).subscribe()
  }

}
