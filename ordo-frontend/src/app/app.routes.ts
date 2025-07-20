import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'kanban',
        loadComponent: () => import('./pages/kanban/kanban.component').then(m => m.KanbanComponent)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
