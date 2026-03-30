import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('../features/home/home').then((m) => m.Home),
  },
  {
    path: 'directory',
    loadComponent: () =>
      import('../features/directory/directory').then((m) => m.Directory),
  },
  {
    path: 'login',
    loadComponent: () => import('../features/auth/auth').then((m) => m.Auth),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
