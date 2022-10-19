import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { BehaviorSubject, every, map, mergeMap, Observable, switchMap, take, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { UserModel } from '@shared/models/user.model';
import { AbsAdminService } from '@shared/services/abstract/admin/abs-admin.service';
import { AdminService } from '@shared/services/concrete/admin/admin.service';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [{provide:AbsAdminService,useClass:AdminService}]
})
export class UserListComponent implements OnInit {
 displayedColumns: string[] = ['user_name', 'full_name', 'birth_date', 'actions'];
  totalPages:number;
  page = new BehaviorSubject(new PageEvent());
  users$:Observable<UserModel[]>
  constructor(private adminService:AbsAdminService) { }


  ngOnInit(): void {
    let initialPage=new PageEvent(); 
    initialPage.pageSize=5;
    initialPage.pageIndex=0;
    this.page.next(initialPage);
    this.users$ = 
      this.page.pipe(
        mergeMap(p=>{
          console.log(p)
        return this.adminService.getUsers(p.pageIndex+1,p.pageSize).pipe(
          tap(result=>{
              console.log(result)
          this.totalPages=result.totalPages}
            ),
          map(result=>result.data)
        ) 
      })
    )
  }


  pageEvent(event:PageEvent){
    console.log(event)
    this.page.next(event)
  }
}
