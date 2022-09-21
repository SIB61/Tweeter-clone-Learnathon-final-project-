import { Routes } from "@angular/router";

export const HomeRoutes:Routes=[
  {
    path:'',
    pathMatch:'full',
    redirectTo:'tweet-feed'
  },
  {
    path:'twit-feed',
    loadComponent:()=>import('@ui/layouts/twit-feed/twit-feed.component').then(m=>m.TwitFeedComponent)
  },
  {
    path:'network',
    loadComponent:()=>import('@ui/layouts/network-layout/network-layout.component').then(m=>m.NetworkLayoutComponent)
  },
  {
    path:'notification',
    loadComponent:()=>import('@ui/layouts/notification-layout/notification-layout.component').then(m=>m.NotificationLayoutComponent)
  },
  {
    path:'search',
    loadComponent:()=>import('@ui/layouts/search-layout/search-layout.component').then(m=>m.SearchLayoutComponent)
  },
  {
    path:'profile',
    loadComponent:()=>import('@ui/layouts/profile-layout/profile-layout.component').then(m=>m.ProfileLayoutComponent)
  }
]
