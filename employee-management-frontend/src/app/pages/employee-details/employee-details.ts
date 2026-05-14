import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import { getApiErrorMessage } from '../../utils/error-utils';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails implements OnInit {

  employee: Employee | null = null;

  errorMessage = '';

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadEmployee(id);
  }

  loadEmployee(id: number): void {

    this.isLoading = true;

    this.employeeService.getEmployeeById(id)
      .subscribe({

        next: (response) => {

          this.employee = response;

          this.isLoading = false;
        },

        error: (err) => {

          this.errorMessage =
            getApiErrorMessage(err, 'Failed to load employee.');

          this.isLoading = false;
        }
      });
  }

  goBack(): void {

    this.router.navigate(['/employees']);
  }
}