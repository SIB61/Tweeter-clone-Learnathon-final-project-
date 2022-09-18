import { Routes } from '@angular/router';

export const AccountRoute:Routes=[
  {
    path:'',
    pathMatch:'full',
    redirectTo:'sign-in'
  },
  {
    path:'sign-in',
    loadComponent:()=>import('src/app/ui/user/login/login.component').then(m=>m.LoginComponent)
  },
  {
    path:'sign-up',
    loadComponent:()=>import('src/app/ui/user/register/register.component').then(m=>m.RegisterComponent)
  },
]
