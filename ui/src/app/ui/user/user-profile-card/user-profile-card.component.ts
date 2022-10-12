import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { UserModel } from '@shared/models/user.model';
import { AbsUserService } from '@shared/services/abstract/user/abs-user.service';
import { Observable } from 'rxjs';
import { UserService } from '@shared/services/concrete/user/user.service';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss'],
  providers: [{ provide: AbsUserService, useClass: UserService }],
})
export class UserProfileCardComponent implements OnInit {
  @Input() userId: string;
  user$: Observable<UserModel>;
  constructor(private userService: AbsUserService) {}
  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.userId);
  }
}
