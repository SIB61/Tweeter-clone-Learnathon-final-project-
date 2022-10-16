import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private storageService:AbsStorageService,private router:Router) {
     const user = storageService.getObject<UserModel>('user') 
     if(user?.role === 'Admin') router.navigateByUrl('admin')
     else if(user?.role === 'User') router.navigateByUrl('home')
  }
}
