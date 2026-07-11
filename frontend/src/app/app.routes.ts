import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskComponent } from './features/tasks/task-list/task.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/auth-guard';
import { guestGuard } from './core/guest-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TaskComponent },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
