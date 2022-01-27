import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService, Credentials } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  credentials: Credentials = {
    email: '',
    password: '',
  };

  action = 'Login';

  constructor(private router: Router,
              private toast: MatSnackBar,
              private authService: AuthService) {
  }

  login() {
    this.authService.login(this.credentials)
      .then(user => this.router.navigate(['/dashboard']))
      .catch(err => this.toast.open(err.message, '', { panelClass: 'toast-error' }));
  }

  register() {
    this.authService.register(this.credentials)
      .then(user => this.toast.open('Account created', '', { panelClass: 'toast-success' }))
      .catch(error => this.toast.open(error.message, '', { panelClass: 'toast-error' }));
  }
}
