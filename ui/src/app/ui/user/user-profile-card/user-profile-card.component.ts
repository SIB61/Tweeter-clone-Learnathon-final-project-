
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { UserModel } from '@shared/models/user.model';
import { AbsUserService } from '@shared/services/abstract/user/abs-user.service';
import { Observable } from 'rxjs';
import { UserService } from '@shared/services/concrete/user/user.service';
import { UserProfileCardComponentStore } from './user-profile-card.component.store';
import { ThousandPipe } from '@shared/pipes/thousand.pipe';
import { faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule, MaterialModule,ThousandPipe],
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss'],
  providers: [{ provide: AbsUserService, useClass: UserService },UserProfileCardComponentStore,ThousandPipe],
})
export class UserProfileCardComponent implements OnInit {
  @Input() userId: string;
 

  faEmail = faEnvelope
  faDate = faCalendar
  user$: Observable<UserModel>;
  constructor(private userProfileComponentStore:UserProfileCardComponentStore) {}
  ngOnInit(): void {
    this.userProfileComponentStore.updateId(this.userId)
    this.user$ = this.userProfileComponentStore.user$
  }
}
