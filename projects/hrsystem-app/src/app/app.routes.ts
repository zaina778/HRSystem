import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { OverviewComponent } from './pages/overview/overview';
import { SchedulingInfoComponent } from './pages/scheduling-info/scheduling-info';
import { UserProfileComponent } from './pages/user-profile/user-profile';
import { AuthGuard } from './shared/services/auth.guard';
export const routes: Routes = [


  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-directory',
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'scheduling-info',
    component: SchedulingInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-settings',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' }
];
