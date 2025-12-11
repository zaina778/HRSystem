import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(private router: Router) {
    const stored = localStorage.getItem('loggedIn');
    this.loggedIn = stored === 'true';
  }

  login() {
    this.loggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
