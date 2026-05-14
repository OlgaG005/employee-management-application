import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getApiErrorMessage } from '../../utils/error-utils';

import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-edit-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployeeById(id).subscribe({
      next: (response) => {
        this.employee = {
          ...response,
          phone: response.phone?.startsWith('+30')
            ? response.phone.substring(3)
            : response.phone
        };
      },
      error: (err) => {
        this.errorMessage = getApiErrorMessage(err, 'Failed to load employee.');
      }
    });
  }


  onSubmit(form: NgForm): void {
    this.errorMessage = '';

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // The user enters only the 10-digit phone number.
    //The country prefix is added before sending the data to the backend
    const employeeToUpdate: Employee = {
      ...this.employee,
      phone: this.employee.phone ? `+30${this.employee.phone}` : ''
    };

    this.employeeService.updateEmployee(this.employee.id, employeeToUpdate).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorMessage = getApiErrorMessage(err, 'Failed to update employee.');
        this.isLoading = false;
      }
    });
  }


  cancel(): void {
    this.router.navigate(['/employees']);
  }
}