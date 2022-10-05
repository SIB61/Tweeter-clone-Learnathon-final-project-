import { Routes } from '@angular/router';

export const AccountRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-up',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('@ui/user/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('@ui/user/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
];
