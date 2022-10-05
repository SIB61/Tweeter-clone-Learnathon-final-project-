import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from './app/core/routes/application.routes';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapComponent } from '@core/bootstrap/bootstrap.component';
import { AbsHttpService } from '@core/abs-services/http/abs-http.service';
import { HttpService } from '@core/services/http/http.service';
import { AbsStorageService } from '@core/abs-services/storage/abs-storage.service';
import { StorageService } from '@core/services/storage/storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BreakPointService } from '@core/services/break-point/break-point.service';
import { HttpErrorHandlerService } from '@core/services/error-handling/http-error-handler.service';
import { AbsHttpErrorHandlerService } from '@core/abs-services/error-handling/abs-http-error-handler.service';
import { TokenInterceptorService } from '@core/interceptors/token-interceptor.service';
import { ErrorHandlingInterceptorService } from '@core/interceptors/error-handling-interceptor.service';
import { AbsLocalTokenService } from '@shared/abs-services/user/abs-local-token.service';
import { LocalUserInfoService } from '@shared/services/user/local-user-info.service';
import { AbsLocalUserService } from '@shared/abs-services/user/abs-local-user.service';
import { MaterialModule } from '@shared/material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
      InfiniteScrollModule
    ),
    BreakPointService,
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
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptorService,
      multi: true,
    },
    {
      provide: AbsLocalTokenService,
      useClass: LocalUserInfoService,
    },
    {
      provide: AbsLocalUserService,
      useClass: LocalUserInfoService,
    },
  ],
}).catch((err) => console.error(err));
