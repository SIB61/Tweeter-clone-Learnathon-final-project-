import { Routes } from "@angular/router";

export const AdminRoutes:Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'user-list'
  },
  {
    path:'user-list',
    loadComponent:()=>import('@ui/admin/user-list/user-list.component').then(m=>m.UserListComponent)
  }
]
