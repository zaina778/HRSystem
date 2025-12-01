import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee, UserStatus } from '../../shared/interfaces/employeeInterface/employee.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class OverviewComponent {

  constructor(private router: Router) {}

  goToSchedule() {
    this.router.navigate(['/scheduling-info']);
  }

  UserStatus = UserStatus;

  employees: Employee[] = [
    { id: 1, name: 'Manuel Soteria', email: 'manuel_soteria@hrconnect.com', status: UserStatus.ACTIVE, dateJoined: '03/12/2019', salary: 70000 },
    { id: 2, name: 'Jonas Zephyrus', email: 'jonas_zephyrus@hrconnect.com', status: UserStatus.ACTIVE, dateJoined: '11/07/2019', salary: 85000 },
    { id: 3, name: 'Prem Silvia', email: 'prem_silvia@hrconnect.com', status: UserStatus.INACTIVE, dateJoined: '06/23/2020', salary: 62000 },
    { id: 4, name: 'Anne Ilshat', email: 'anne_ilshat@hrconnect.com', status: UserStatus.ACTIVE, dateJoined: '02/14/2021', salary: 78000 },
    { id: 5, name: 'Jannat Fernanda', email: 'jannat_fernanda@hrconnect.com', status: UserStatus.ACTIVE, dateJoined: '01/04/2022', salary: 65000 },
    { id: 6, name: 'Miles Cinzia', email: 'miles_cinzia@hrconnect.com', status: UserStatus.INACTIVE, dateJoined: '09/10/2022', salary: 90000 },
    { id: 7, name: 'Sophia Kim', email: 's.kim@hrconnect.com', status: UserStatus.ACTIVE, dateJoined: '02/12/2023', salary: 71000 },
    { id: 8, name: 'Carlos Martinez', email: 'c.martinez@hrconnect.com', status: UserStatus.ACTIVE, dateJoined: '07/22/2024', salary: 88000 },
    { id: 9, name: 'Safiyya Venkat', email: 'safiyya_venkat@hrconnect.com', status: UserStatus.INACTIVE, dateJoined: '05/19/2015', salary: 56000 },
    { id: 10, name: 'Serapion Kodjo', email: 'serapion_kodjo@hrconnect.com', status: UserStatus.ACTIVE, dateJoined: '08/30/2025', salary: 73000 }
  ];

  weeklySchedule = [
    { day: 'MON', unavailable: [], meeting: null },
    { day: 'TUE', unavailable: ['Sophia'], meeting: null },
    { day: 'WED', unavailable: ['Manuel', 'Sarah'], meeting: null },
    { day: 'THU', unavailable: [], meeting: null },
    { day: 'FRI', unavailable: [], meeting: 'Company Meeting at 10AM' }
  ];

  recentActivity = [
    'New employee added: Carlos Martinez',
    'Leave approved for Sophia Kim',
    'Status updated: Miles Cinzia → Inactive',
    'Leave request submitted by Jannat Fernanda'
  ];

  orgSnapshot = {
    departments: 4,
    avgTenureYears: 3.2,
    hiresThisYear: 6,
    turnoverThisYear: 1
  };

  get activeEmployeesCount() {
    return this.employees.filter(e => e.status === UserStatus.ACTIVE).length;
  }

  get inactiveEmployeesCount() {
    return this.employees.filter(e => e.status === UserStatus.INACTIVE).length;
  }

  get onLeaveEmployeesCount() {
    return this.weeklySchedule.reduce((total, day) => total + day.unavailable.length, 0);
  }
}
