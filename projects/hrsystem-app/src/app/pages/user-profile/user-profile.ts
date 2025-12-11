import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/userService/user.service';
import { AuthService } from '../../shared/services/authService/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent implements OnInit {
  defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  user: any;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  showPasswordModal = false;

  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(private userService: UserService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.userService.getUser();

    this.profileForm = new FormGroup({
      fullName: new FormControl(this.user.fullName, [Validators.required])
    });

    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  openPasswordModal() {
    this.showPasswordModal = true;
  }

  closePasswordModal() {
    this.showPasswordModal = false;
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.userService.updateUser({
        fullName: this.profileForm.value.fullName!,
      });
    }
  }

  savePassword() {
    if (this.passwordForm.valid) {
      const newPass = this.passwordForm.get('newPassword')?.value!;
      const confirm = this.passwordForm.get('confirmPassword')?.value!;

      if (newPass !== confirm) {
        alert("Passwords do not match.");
        return;
      }

      this.userService.updatePassword(newPass);
      alert("Password updated!");
      this.passwordForm.reset();
      this.closePasswordModal();
    }
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.userService.updateProfilePhoto(reader.result as string);
      this.user = this.userService.getUser();
    };
    reader.readAsDataURL(file);
  }

  resetPhoto() {
    this.userService.updateProfilePhoto(null);
    this.user = this.userService.getUser();
  }

  logout() {
    this.auth.logout();
  }
}
