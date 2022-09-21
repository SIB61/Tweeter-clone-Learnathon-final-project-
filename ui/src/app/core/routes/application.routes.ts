import { Routes } from '@angular/router';
import { AccountRoutes } from './account.routes';
import { HomeRoutes } from './home.routes';

export const ApplicationRoutes:Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'account'
  },
  {
    path:'account',
    loadComponent:()=>import('@ui/layouts/account/account.component').then(m=>m.AccountComponent),
    children:AccountRoutes
  },
  {
    path:'home',
    loadComponent:()=>import('@ui/layouts/home/home.component').then(m=>m.HomeComponent),
    children:HomeRoutes
  }
]

