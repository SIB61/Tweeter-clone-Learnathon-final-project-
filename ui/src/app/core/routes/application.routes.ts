import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AuthService } from '@shared/services/concrete/auth/auth.service';
import { AccountRoutes } from './account.routes';
import { HomeRoutes } from './home.routes';

export const ApplicationRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AuthService.loggedIn ? 'home' : 'account',
  },
  {
    path: 'account',
    loadComponent: () =>
      import('@ui/layouts/account/account.component').then(
        (m) => m.AccountComponent
      ),
    children: AccountRoutes,
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@ui/layouts/home/home.component').then((m) => m.HomeComponent),
    children: HomeRoutes,
  },
];
