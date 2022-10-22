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
import { BreakPointService } from '@core/services/concrete/break-point/break-point.service';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { HttpService } from '@core/services/concrete/http/http.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { StorageService } from '@core/services/concrete/storage/storage.service';
import { AbsHttpErrorHandlerService } from '@core/services/abstract/error-handling/abs-http-error-handler.service';
import { HttpErrorHandlerService } from '@core/services/concrete/error-handling/http-error-handler.service';
import { LocalUserInfoService } from '@shared/services/concrete/user/local-user-info.service';
import { AbsLocalUserInfoService } from '@shared/services/abstract/user/abs-local-user-info.service';
import { LoadingService } from '@core/services/concrete/loading.service';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { TimeagoClock, TimeagoModule } from 'ngx-timeago';
import { MyClock } from '@core/services/concrete/time-ago-clock';
import { StoreModule } from '@ngrx/store';
import { Reducers } from '@store/app.state';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(BootstrapComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(ApplicationRoutes),
      BrowserAnimationsModule,
      HttpClientModule,
      MaterialModule,
      InfiniteScrollModule,
      TimeagoModule.forRoot({clock:{provide:TimeagoClock,useClass:MyClock}}),
      StoreModule.forRoot(Reducers)
    ),
    LoadingService,
    BreakPointService,
    {
      provide: AbsLocalUserInfoService,
      useClass: LocalUserInfoService,
    },
    {
      provide: AbsHttpService,
      useClass: HttpService,
    },
    {
      provide: AbsStorageService,
      useClass: StorageService,
    },
    {
      provide: AbsHttpErrorHandlerService,
      useClass: HttpErrorHandlerService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptorService,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
