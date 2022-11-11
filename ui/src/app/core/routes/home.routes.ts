import { Routes } from '@angular/router';
import { NetworkRoutes } from './network.routes';

export const HomeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tweet-feed',
  },
  {
    path: 'tweet-feed',
    loadComponent: () =>
      import('@ui/layouts/twit-feed/twit-feed.component').then(
        (m) => m.TwitFeedComponent
      ),
    data: { title: 'Tweet Feed' },
  },
  {
    path: 'network',
    loadComponent: () =>
      import('@ui/layouts/network-layout/network-layout.component').then(
        (m) => m.NetworkLayoutComponent
      ),
    children: NetworkRoutes,
    // data: { title: 'Network' },
  },
  {
    path: 'notification',
    loadComponent: () =>
      import(
        '@ui/layouts/notification-layout/notification-layout.component'
      ).then((m) => m.NotificationLayoutComponent),
    data: { title: 'Notifications' },
  },
  {
    path: 'search',
    loadComponent: () =>
      import('@ui/layouts/search-layout/search-layout.component').then(
        (m) => m.SearchLayoutComponent
      ),
    data: { title: 'Search' },
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('@ui/layouts/profile-layout/profile-layout.component').then(
        (m) => m.ProfileLayoutComponent
      ),
    data: { title: 'profile' },
  },
  {
    path: 'tweet/:id',
    loadComponent: () =>
      import('@ui/layouts/comments-layout/comments-layout.component').then(
        (m) => m.CommentsLayoutComponent
      ),
  },
];
