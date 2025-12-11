import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  private user = {
    fullName: '',
    email: '',
    role: 'Employee',
    department: 'Human Resources',
    profilePhoto: null as string | null,
  };

  constructor(private router: Router) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedUser = localStorage.getItem('user');
    const storedLoggedIn = localStorage.getItem('loggedIn');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.loggedIn = storedLoggedIn === 'true';
  }

  private saveToStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('loggedIn', this.loggedIn.toString());
  }

  private generateNameFromEmail(email: string): string {
    const namePart = email.split('@')[0];
    const [first, last] = namePart.split('_'); //split email at _ to get name

    if (!first || !last) return email;

    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    return `${cap(first)} ${cap(last)}`;
  }

  login(email: string) {
    this.loggedIn = true;
    this.user.email = email;
    this.user.fullName = this.generateNameFromEmail(email);

    this.saveToStorage();
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUser() {
    return this.user;
  }

  updateUser(changes: Partial<typeof this.user>) {
    this.user = { ...this.user, ...changes };
    this.saveToStorage();
  }


  updateProfilePhoto(photo: string | null) {
    this.user.profilePhoto = photo;
    this.saveToStorage();
  }

  updatePassword(newPass: string) {
    console.log("Password updated to:", newPass);
    return true;
  }
}
