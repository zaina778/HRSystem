import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = {
    fullName: '',
    email: '',
    role: 'Employee',
    department: 'Human Resources',
    profilePhoto: null as string | null,
  };

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  private saveToStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  setEmail(email: string) {
    this.user.email = email;
    this.user.fullName = this.generateNameFromEmail(email);
    this.saveToStorage();
  }

  private generateNameFromEmail(email: string): string {
    const namePart = email.split('@')[0];
    const [first, last] = namePart.split('_');
    if (!first || !last) return email;
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    return `${cap(first)} ${cap(last)}`;
  }

  updateUser(changes: Partial<typeof this.user>) {
    this.user = { ...this.user, ...changes };
    this.saveToStorage();
  }

  updatePassword(newPass: string) {
    console.log("Password updated to:", newPass);
    return true;
  }

  updateProfilePhoto(photo: string | null) {
    this.user.profilePhoto = photo;
    this.saveToStorage();
  }

  getUser() {
    return this.user;
  }
}
