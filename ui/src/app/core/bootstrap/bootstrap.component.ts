import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '@core/services/concrete/loading.service';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from '@store/app.state';
import { HttpLoadingState } from '@store/selectors/http-loading.selector';


@Component({
  selector: 'app-bootstrap',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule],
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss'],
})
export class BootstrapComponent implements OnInit {
  constructor(private store: Store<AppState>,private loadingService:LoadingService) {}
  loading$:Observable<boolean> 
  isLoading=false;
  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$
  }

}
