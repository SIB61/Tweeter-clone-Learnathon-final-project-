import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { UserModel } from '@shared/models/user.model';
import { LoadingService } from '@core/services/concrete/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule,MatProgressBarModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  {
  constructor(public loadingService:LoadingService ) {
    loadingService.loading$.subscribe(v=>console.warn(v))
  }
}
