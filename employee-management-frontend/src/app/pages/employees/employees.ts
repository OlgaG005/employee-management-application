import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { AuthService } from '../../services/auth';
import { Employee } from '../../models/employee';
import { getApiErrorMessage } from '../../utils/error-utils';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees implements OnInit {
  employees: Employee[] = [];

  isLoading = false;
  errorMessage = '';

  role: 'ADMIN' | 'USER' | null = null;

  searchTerm = '';
  sortBy = 'createdAt';
  direction: 'asc' | 'desc' = 'asc';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.loadEmployees();
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  goToCreateEmployee(): void {
    this.router.navigate(['/employees/create']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService
      .getEmployees(this.searchTerm, this.sortBy, this.direction)
      .subscribe({
        next: (response) => {
          this.employees = response;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = getApiErrorMessage(err, 'Failed to load employees.');
          this.isLoading = false;
        }
      });
  }

  applyFilters(): void {
    this.loadEmployees();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.sortBy = 'createdAt';
    this.direction = 'asc';
    this.loadEmployees();
  }


  deleteEmployee(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this employee?');

    if (!confirmed) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(employee => employee.id !== id);
      },
      error: (err) => {
        this.errorMessage = getApiErrorMessage(err, 'Failed to delete employee.');
      }
    });
  }

  goToEditEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  goToEmployeeDetails(id: number): void {
    this.router.navigate(['/employees/details', id]);
  }
}