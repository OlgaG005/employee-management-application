import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Employees } from './pages/employees/employees';
import { CreateEmployee } from './pages/create-employee/create-employee';
import { EditEmployee } from './pages/edit-employee/edit-employee';
import { EmployeeDetails } from './pages/employee-details/employee-details';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'employees',
    component: Employees,
    canActivate: [authGuard]
  },
  {
  path: 'employees/create',
  component: CreateEmployee,
  canActivate: [authGuard]
},
{
  path: 'employees/edit/:id',
  component: EditEmployee,
  canActivate: [authGuard]
},
{
  path: 'employees/details/:id',
  component: EmployeeDetails,
  canActivate: [authGuard]
}
];