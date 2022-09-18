import { Routes } from '@angular/router';
import { AccountRoute } from './account.routes';

export const ApplicationRoutes:Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'account'
  },
  {
    path:'account',
    loadComponent:()=>import('src/app/ui/layouts/account/account.component').then(m=>m.AccountComponent),
    children:AccountRoute
  }
]

