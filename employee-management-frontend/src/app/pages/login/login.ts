import { Component } from '@angular/core';
import { Router } from '@angular/router';

/*
  CHANGE:
  Προσθέσαμε NgForm.
*/
import { FormsModule, NgForm } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { getApiErrorMessage } from '../../utils/error-utils';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  
  onSubmit(form: NgForm): void {
    this.errorMessage = '';

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.saveAuth(response);
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorMessage = getApiErrorMessage(err, 'Invalid email or password.');
        this.isLoading = false;
      }
    });
  }
}