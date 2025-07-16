import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'kanban', component: KanbanComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'profile', component: UserProfileComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
