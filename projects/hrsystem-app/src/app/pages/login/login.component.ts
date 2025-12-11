import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/authService/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  hidePassword: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    ]),
    remember: new FormControl(false),
  });

  constructor(private router: Router, private auth: AuthService) {
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value!;
      this.auth.login(email);
      this.router.navigate(['/dashboard']);
    }
  }

}
