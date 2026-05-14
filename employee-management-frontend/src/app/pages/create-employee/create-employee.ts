import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import { getApiErrorMessage } from '../../utils/error-utils';

@Component({
  selector: 'app-create-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.css'
})
export class CreateEmployee {

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: '',
    phone: '',
    createdAt: '',
    updatedAt: ''
  };

  errorMessage = '';

  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }


  onSubmit(form: NgForm): void {

    this.errorMessage = '';

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // The user enters only the 10-digit phone number.
    //The country prefix is added before sending the data to the backend
    const employeeToSave: Employee = {
  ...this.employee,
  phone: this.employee.phone ? `+30${this.employee.phone}` : ''
};

    this.employeeService.createEmployee(employeeToSave)
      .subscribe({

        next: () => {

          this.router.navigate(['/employees']);
        },

        error: (err) => {
          this.errorMessage = getApiErrorMessage(err, 'Failed to create employee.');
          this.isLoading = false;
        }
      });
  }
}