import { Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { AuthGuard } from '@core/guards/auth.guard';
import { StorageService } from '@core/services/concrete/storage/storage.service';
import { AccountRoutes } from './account.routes';
import { HomeRoutes } from './home.routes';

export const ApplicationRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'account'
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
    loadComponent: () => import('@ui/layouts/admin-layout/admin-layout.component').then(m=>m.AdminLayoutComponent)
  }
];
