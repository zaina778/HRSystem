import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee, UserStatus } from '../../shared/interfaces/employeeInterface/employee.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.scss'],
})

export class EmployeesComponent {
  UserStatus = UserStatus;
  saveEmployee() {
    if (!this.editingEmployee) return;

    const index = this.employees.findIndex(e => e.id === this.editingEmployee!.id);

    if (index !== -1) {
      this.employees[index] = { ...this.editingEmployee };
    } else {
      this.employees.push({ ...this.editingEmployee });
    }

    this.editingEmployee = null;
  }


  cancelEdit() {
    this.editingEmployee = null;
  }

  editingEmployee: Employee | null = null;
  editEmployee(emp: Employee) {
    console.log("EDIT FIRED", emp);
    this.editingEmployee = { ...emp };
  }
  openAddEmployee() {
    this.editingEmployee = {
      id: this.employees.length + 1,
      name: '',
      email: '',
      status: UserStatus.ACTIVE,
      dateJoined: this.formatDateMMDDYYYY(new Date()),
      salary: 0
    };
  }
  formatDateMMDDYYYY(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }



  employees: Employee[] = [
    {
      id: 1,
      name: 'Manuel Soteria',
      email: 'manuel_soteria@hrconnect.com',
      status: UserStatus.ACTIVE,
      dateJoined: '03/12/2019',
      salary: 70000
    },
    {
      id: 2,
      name: 'Jonas Zephyrus',
      email: 'jonas_zephyrus@hrconnect.com',
      status: UserStatus.ACTIVE,
      dateJoined: '11/07/2019',
      salary: 85000
    },
    {
      id: 3,
      name: 'Prem Silvia',
      email: 'prem_silvia@hrconnect.com',
      status: UserStatus.INACTIVE,
      dateJoined: '06/23/2020',
      salary: 62000
    },
    {
      id: 4,
      name: 'Anne Ilshat',
      email: 'anne_ilshat@hrconnect.com',
      status: UserStatus.ACTIVE,
      dateJoined: '02/14/2021',
      salary: 78000
    },
    {
      id: 5,
      name: 'Jannat Fernanda',
      email: 'jannat_fernanda@hrconnect.com',
      status: UserStatus.ACTIVE,
      dateJoined: '01/04/2022',
      salary: 65000
    },
    {
      id: 6,
      name: 'Miles Cinzia',
      email: 'miles_cinzia@hrconnect.com',
      status: UserStatus.INACTIVE,
      dateJoined: '09/10/2022',
      salary: 90000
    },
    {
      id: 7,
      name: 'Sophia Kim',
      email: 's.kim@hrconnect.com',
      status: UserStatus.ACTIVE,
      dateJoined: '02/12/2023',
      salary: 71000
    },
    {
      id: 8,
      name: 'Carlos Martinez',
      email: 'c.martinez@hrconnect.com',
      status: UserStatus.ACTIVE,
      dateJoined: '07/22/2024',
      salary: 88000
    },
    {
      id: 9,
      name: 'Safiyya Venkat',
      email: 'safiyya_venkat@hrconnect.com',
      status: UserStatus.INACTIVE,
      dateJoined: '05/19/2015',
      salary: 56000
    },
    {
      id: 10,
      name: 'Serapion Kodjo',
      email: 'serapion_kodjo@hrconnect.com',
      status: UserStatus.ACTIVE,
      dateJoined: '08/30/2025',
      salary: 73000
    }
  ];
}
