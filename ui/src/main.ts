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
import { TweeterHttpInterceptor } from '@core/interceptors/tweeter-http.interceptor';
import { BreakPointService } from '@core/services/break-point/break-point.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(BootstrapComponent,{
  providers:[
   importProvidersFrom(RouterModule.forRoot(ApplicationRoutes),
      BrowserAnimationsModule,HttpClientModule),
    BreakPointService,
    {
      provide:AbsHttpService,
      useClass:HttpService
    },
    {
      provide:AbsStorageService,
      useClass:StorageService
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TweeterHttpInterceptor,
      multi:true
    }
  ]
}).catch(err=>console.error(err))
