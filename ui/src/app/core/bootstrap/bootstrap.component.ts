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
  providers: [LoadingService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BootstrapComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  loading$:Observable<boolean> 
  isLoading=false;
  ngOnInit(): void {
    this.store.select('httpLoadingState').
      subscribe(v=>{
        console.error(v)
        this.isLoading=v.loading
      })
    // this.loading$.subscribe(v=>console.error(v))
  }
}
