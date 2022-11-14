import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { AuthGuard } from '@core/guards/auth.guard';
import { StorageService } from '@core/services/concrete/storage/storage.service';
import { UserModel } from '@shared/models/user.model';
import { AccountRoutes } from './account.routes';
import { AdminRoutes } from './admin.routes';
import { HomeRoutes } from './home.routes';

export const ApplicationRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: getAppRediraction()
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@ui/layouts/account/account.component').then(
        (m) => m.AccountComponent
      ),
    children: AccountRoutes,
    data: { data: 'account' },
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@ui/layouts/home/home.component').then((m) => m.HomeComponent),
    children: HomeRoutes,
    data: { data: 'home' },
  },
  {
    path:'admin',
    canActivate: [AdminGuard,AuthGuard],
    loadComponent: () => import('@ui/layouts/admin-layout/admin-layout.component').then(m=>m.AdminLayoutComponent),
    children:AdminRoutes
  },
  {

    path:"**",
    redirectTo:'404'
  },
  {
    path:'404',
    loadComponent:() => import('@ui/layouts/not-found/not-found.component').then(m=>m.NotFoundComponent)
  }

];

function getAppRediraction():string{
  const user = new StorageService().getObject<UserModel>('user')
  if(!user) return 'account'
  else  if(user.role == 'Admin') return 'admin'
  else if(user.role == 'User') return 'home'
  return ''
}

