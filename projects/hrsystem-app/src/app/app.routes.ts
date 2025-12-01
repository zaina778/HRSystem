import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { OverviewComponent } from './pages/overview/overview';
import { SchedulingInfoComponent } from './pages/scheduling-info/scheduling-info';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'employee-directory', component: EmployeesComponent },
  { path: 'scheduling-info', component: SchedulingInfoComponent },
  { path: '**', redirectTo: '' }
];
