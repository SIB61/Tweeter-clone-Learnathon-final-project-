import { useAnimation } from '@angular/animations';
import { Routes } from '@angular/router';
import { StorageService } from '@core/services/concrete/storage/storage.service';
import { UserModel } from '@shared/models/user.model';

export const AccountRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('@ui/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('@ui/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('@ui/auth/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
  },
];

