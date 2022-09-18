import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapComponent } from './app/core/bootstrap/bootstrap.component';
import { ApplicationRoutes } from './app/core/routes/application.routes';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(BootstrapComponent,{
  providers:[
   importProvidersFrom(RouterModule.forRoot(ApplicationRoutes), BrowserAnimationsModule)
  ]
}).catch(err=>console.error(err))
