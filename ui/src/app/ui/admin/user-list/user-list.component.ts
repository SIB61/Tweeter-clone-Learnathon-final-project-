import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { PageEvent } from '@angular/material/paginator';
import { UserModel } from '@shared/models/user.model';
import { AbsAdminService } from '@shared/services/abstract/admin/abs-admin.service';
import { AdminService } from '@shared/services/concrete/admin/admin.service';
import { faBan, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserListComponentStore } from './user-list.component.store';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '@ui/dump/user-update/user-update.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { PermissionComponent } from '@ui/dump/permission/permission.component';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,MaterialModule,ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [{provide:AbsAdminService,useClass:AdminService},UserListComponentStore]
})
export class UserListComponent implements OnInit {
 displayedColumns: string[] = ['user_name', 'full_name', 'birth_date','total_followers','total_followings','total_posts', 'actions'];


  selected:string 
  blockIcon = faBan
  updateIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(private userListComponentStore:UserListComponentStore,private dialog:MatDialog) { }

  users:UserModel[]
  users$ = this.userListComponentStore.users$
  pageFromApi$ = this.userListComponentStore.pageFromApi$

  ngOnInit(): void {
    this.selected='All'
  }

  pageEvent(event:PageEvent){
    this.userListComponentStore.updatePageFromUi(event)  
  }
 
  selectionChanged(){
   this.userListComponentStore.updateFilter(this.selected)  
  }

  block(user:UserModel){
    let title = user.isBlock? `Unblock ${user.fullName}?`: `Block ${user.fullName}?`
    this.dialog.open(PermissionComponent,{data:title}).afterClosed().subscribe(v=>{
      if(v==="ok")
         this.userListComponentStore.block(user)   
    })
  }
  update(user:UserModel){
   this.dialog.open(UserUpdateComponent,{data:user}).afterClosed().subscribe(result => {
      if(result){
      user.dateOfBirth = result.dateOfBirth
      user.fullName = result.fullName
      this.userListComponentStore.update(user)  
      }
    });
  }
}
