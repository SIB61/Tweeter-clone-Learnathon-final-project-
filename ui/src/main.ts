import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from './app/core/routes/application.routes';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapComponent } from '@core/bootstrap/bootstrap.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '@core/interceptors/token-interceptor.service';
import { ErrorHandlingInterceptorService } from '@core/interceptors/error-handling-interceptor.service';
import { MaterialModule } from '@shared/material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimeagoClock, TimeagoModule } from 'ngx-timeago';
import { MyClock } from '@core/services/concrete/time-ago-clock';
import { StoreModule } from '@ngrx/store';
import { Reducers } from '@store/app.state';
import { HttpCatchingInterceptor } from '@core/interceptors/http-caching.interceptor';
import { TimeoutInterceptor } from '@core/interceptors/timeout.interceptor';
import { APP_BASE_HREF } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(BootstrapComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(ApplicationRoutes,{useHash:true}),
      BrowserAnimationsModule,
      HttpClientModule,
      MaterialModule,
      InfiniteScrollModule,
      TimeagoModule.forRoot({clock:{provide:TimeagoClock,useClass:MyClock}}),
      StoreModule.forRoot(Reducers),
      RouterModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpCatchingInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TimeoutInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptorService,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
