import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskComponent } from './features/tasks/task-list/task.component';
import { authGuard } from './core/auth-guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TaskComponent }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'login' },

];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}