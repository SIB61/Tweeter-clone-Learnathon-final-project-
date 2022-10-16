import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { UserModel } from '@shared/models/user.model';
import { AbsFollowService } from '@shared/services/abstract/user/abs-follow.service';
import { FollowService } from '@shared/services/concrete/user/follow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-preview-cart',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './user-preview-cart.component.html',
  styleUrls: ['./user-preview-cart.component.scss'],
  providers: [{ provide: AbsFollowService, useClass: FollowService }],
})
export class UserPreviewCartComponent implements OnInit {
  constructor(
    private followService: AbsFollowService,
    private snackbar: MatSnackBar
  ) {}
  @Input() user: UserModel;
  buttonText: string;
  loading = false;
  ngOnInit(): void {
    console.log(this.user);
    this.buttonText = this.user.isFollow ? 'Unfollow' : 'Follow';
  }

  onAction() {
    this.loading = true;
    if (this.buttonText == 'Unfollow') {
      this.followService
        .unfollow(this.user.id)
        .pipe(
          tap((_) => {
            this.buttonText = 'Follow';
            this.loading = false;
          })
        )
        .subscribe();
    } else {
      this.followService
        .follow(this.user.id)
        .pipe(
          tap((_) => {
            this.buttonText = 'Unfollow';
            this.loading = false;
          })
        )
        .subscribe();
    }
  }
}
