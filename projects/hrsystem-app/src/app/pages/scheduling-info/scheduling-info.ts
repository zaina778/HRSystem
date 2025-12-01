import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-scheduling-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './scheduling-info.html',
  styleUrls: ['./scheduling-info.scss']
})
export class SchedulingInfoComponent {

  viewMode: 'weekly' | 'monthly' = 'monthly';

  editMode = false;

  activeEmployees = [
    'Manuel Soteria',
    'Jonas Zephyrus',
    'Anne Ilshat',
    'Jannat Fernanda',
    'Sophia Kim',
    'Carlos Martinez',
    'Serapion Kodjo'
  ];

  shifts = [
    { date: '2025-11-04', unavailable: ['Sophia Kim'] },
    { date: '2025-11-05', unavailable: ['Sophia Kim'] },
    { date: '2025-11-10', unavailable: ['Jannat Fernanda'] },
    { date: '2025-11-19', unavailable: ['Anne Ilshat'] },
    { date: '2025-11-25', unavailable: ['Carlos Martinez'] },
    { date: '2025-11-07', meeting: 'Company Meeting at 10AM', unavailable: [] }
  ];

  weeklySummary = [
    { day: 'MON', unavailable: [], meeting: null },
    { day: 'TUE', unavailable: ['Sarah'], meeting: null },
    { day: 'WED', unavailable: ['Sophia'], meeting: null },
    { day: 'THU', unavailable: ['Carlos'], meeting: null },
    { day: 'FRI', unavailable: [], meeting: 'Company Meeting at 10AM' }
  ];

  daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  calendarDays = this.buildCalendar(2025, 10);

  modalOpen = false;
  modalData: any = null;

  form = new FormGroup({
    employee: new FormControl(''),
    status: new FormControl('available')
  });

  openModal(data: any) {
    this.modalOpen = true;
    this.editMode = false;

    const unavailable = data.unavailable || [];

    const workingList = this.activeEmployees.filter(
      emp => !unavailable.includes(emp)
    );

    this.modalData = {
      date: data.date,
      meeting: data.meeting || null,
      unavailable: unavailable,
      working: workingList
    };

    this.form.reset({
      employee: '',
      status: 'available'
    });
  }

  closeModal() {
    this.modalOpen = false;
    this.modalData = null;
    this.editMode = false;
  }

  startEdit() {
    this.editMode = true;
  }

  saveShift() {
    const employee = this.form.value.employee;
    const status = this.form.value.status;

    if (!employee) return;

    if (status === 'unavailable') {
      if (!this.modalData.unavailable.includes(employee)) {
        this.modalData.unavailable.push(employee);
      }
    } else {
      this.modalData.unavailable = this.modalData.unavailable.filter(
        (u: string) => u !== employee

      );
    }

    this.modalData.working = this.activeEmployees.filter(
      emp => !this.modalData.unavailable.includes(emp)
    );

    this.editMode = false;
  }

  buildCalendar(year: number, month: number) {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const weeks = [];
    let week = new Array(7).fill(null);

    for (let i = 0; i < first.getDay(); i++) week[i] = null;

    for (let day = 1; day <= last.getDate(); day++) {
      const d = new Date(year, month, day);
      const pos = d.getDay();
      const id = `${year}-${month + 1}-${String(day).padStart(2, '0')}`;
      const shift = this.shifts.find(s => s.date === id);

      week[pos] = {
        date: day,
        unavailable: shift?.unavailable || [],
        meeting: shift?.meeting || null
      };

      if (pos === 6) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
    }

    if (week.some(x => x !== null)) weeks.push(week);
    return weeks;
  }
}
