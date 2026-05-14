import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {


    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Employee[]>(this.apiUrl, { headers });
  }


  createEmployee(employee: Employee): Observable<Employee> {

  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post<Employee>(
    this.apiUrl,
    employee,
    { headers }
  );
}

deleteEmployee(id: number): Observable<void> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
}

getEmployeeById(id: number): Observable<Employee> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<Employee>(`${this.apiUrl}/${id}`, { headers });
}

updateEmployee(id: number, employee: Employee): Observable<Employee> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers });
}
}

