import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/userService/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  username = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    const user = this.userService.getUser();
    this.username = user.fullName;
  }

  timeRange: 'monthly' | 'annual' = 'monthly';

  monthlyAnalytics = {
    totalEmployees: 42,
    activeEmployees: 38,
    inactiveEmployees: 4,
    pendingLeave: 3,
    avgTenure: 2.4,
    birthdays: [
      {name: 'Maneul', date: 'Nov 20'},
      {name: 'Anne', date: 'Nov 29'}
    ]
  };

  annualAnalytics = {
    totalEmployees: 57,
    activeEmployees: 38,
    inactiveEmployees: 19,
    pendingLeave: 8,
    avgTenure: 2.4,
    birthdays: [
      {name: 'Manuel', date: 'Nov 20'},
      {name: 'Anne', date: 'Nov 29'},
      {name: 'Miles', date: 'Feb 14'},
      {name: 'Safiyya', date: 'Jul 8'}
    ]
  };

  analytics = this.monthlyAnalytics;

  changeRange(range: 'monthly' | 'annual') {
    this.timeRange = range;
    this.analytics = range === 'monthly'
      ? this.monthlyAnalytics
      : this.annualAnalytics;
  }
}
