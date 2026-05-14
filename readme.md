# Employee Manager Application

## Description

A full-stack web application that supports CRUD operations using a Java REST API backend, an RDBMS database , and an Angular 16+ frontend.
The purpose of this assignment is to evaluate your understanding of full stack development, REST APIs, database design, validation, and frontend-backend integration


## Features

### Employee Management

- Create a new employee
- List all employees
- View employee details
- Update employee information
- Delete an employee with confirmation

### Validation

- Client-side validation in Angular forms
- Backend validation using Spring Boot validation annotations
- Clear validation error messages for users
- Backend/API error handling and display in the frontend

### Authentication and Authorization

- Login functionality
- JWT-based authentication
- Role-based access control

Role permissions:

| Role | Permissions |
|---|---|
| ADMIN | Can view, create, update, and delete employees |
| USER | Can only view employees |

### Additional Features

- Backend logging for important actions and errors
- Swagger/OpenAPI documentation
- H2 database console
- Clean layered backend structure
- Responsive and understandable UI




## Technologies Used

### Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- Bean Validation
- H2 Database
- Lombok
- Swagger / OpenAPI
- Maven

### Frontend

- Angular
- TypeScript
- HTML
- CSS
- Angular Forms
- Angular Routing

## Backend Structure

The backend is built with Spring Boot and follows a clean layered architecture. The code is organized by responsibility, so each package has a clear role in the application.

Main backend responsibilities:

- Expose REST endpoints for employee CRUD operations
- Validate incoming requests before saving data
- Store and retrieve employee records from the database
- Handle authentication through JWT
- Enforce role-based authorization
- Return structured error responses
- Log important actions and errors
- Provide Swagger/OpenAPI documentation

Main backend packages:

- `auth/`: handles login requests and authentication responses
- `employeemanagement/`: contains the Employee entity, DTOs, repository, service, and controller
- `security/`: contains JWT generation, JWT request filtering, and Spring Security configuration
- `user/`: contains application users, roles, and user repository
- `common/`: contains custom exceptions and global exception handling
- `config/`: contains CORS configuration, Swagger/OpenAPI configuration, and initial test user creation

## Frontend Structure

The frontend is built with Angular and follows a simple page-based structure. It communicates with the backend through Angular services and displays different actions depending on the logged-in user's role.

Main frontend responsibilities:

- Display the login page
- Display the employee list
- Display employee details
- Provide forms for creating and editing employees
- Validate user input before sending requests to the backend
- Display backend/API errors
- Hide or show UI actions based on the logged-in user's role

Main frontend parts:

- `app.routes.ts`: defines the application routes
- `auth-guard.ts`: protects pages that require authentication
- `services/`: handles communication with the backend API
- `models/`: defines TypeScript interfaces for data models
- `login/`: handles user login
- `employees/`: displays the employee list and available actions
- `create-employee/`: form for creating employees
- `edit-employee/`: form for updating employees
- `employee-details/`: displays employee details

## Backend Setup

### Prerequisites

Make sure you have installed:

- Java 17
- Maven

### Run the Backend

Navigate to the backend project folder:

` cd employee-management-api `

Run the application:

` mvnw.cmd spring-boot:run`

The backend will start on:

<http://localhost:8080>

## Frontend Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Angular CLI

## Run the Frontend

Navigate to the frontend project folder:

` cd employee-management-frontend`

Install dependencies:

` npm install`

Start the Angular application:

` ng serve`

The frontend will start on:

<http://localhost:4200>

## Run with Docker

The application can also be run using Docker Compose.

### Prerequisites

Make sure Docker Desktop is installed and running.

### Start the Application

From the root project folder, run:

```bash
docker compose up --build
```

This will build and start both the backend and the frontend containers.

The frontend will be available at:
`http://localhost:4200`

The backend API will be available at:
`http://localhost:8080`

Swagger UI will be available at:
`http://localhost:8080/swagger-ui/index.html`

H2 Console will be available at:
`http://localhost:8080/h2-console`

### Stop the Application
To stop the containers, press Ctrl + C in the terminal running Docker Compose
Then run:

```bash
docker compose down
```


## Test Users

The application creates two test users automatically on backend startup.

**Admin User**

Email: <admin@test.com>  
Password: Admin123!  
Role: ADMIN

The admin user can:

- View employees
- Create employees
- Update employees
- Delete employees

**Regular User**

Email: <user@test.com>  
Password: User123!  
Role: USER

The regular user can:

- View employees only

## Database

The application uses an in-memory H2 database for easier setup and testing.

Database configuration:

URL: jdbc:h2:mem:employeesdb  
Username: username 
Password: password

H2 Console:

<http://localhost:8080/h2-console>

JDBC URL:

jdbc:h2:mem:employeesdb

Note: Since the database is in-memory, employee records are reset when the backend application restarts. Test users are recreated automatically on startup.

## Swagger / OpenAPI
Swagger UI is available at:

<http://localhost:8080/swagger-ui/index.html>

The Swagger documentation can be used to inspect and test the available REST API endpoints.

For protected endpoints, login first through the authentication endpoint, copy the JWT token, and use it as a Bearer token in Swagger.

## API Endpoints

**Authentication**

| **Method** | **Endpoint**    | **Description**             |
| ---------- | --------------- | --------------------------- |
| POST       | /api/auth/login | Login and receive JWT token |

Example login request:
```json
{  
"email": "<admin@test.com>",  
"password": "Admin123!"  
}
```

Example login response:
```json
{  
"token": "jwt-token-here",  
"email": "<admin@test.com>",  
"role": "ADMIN"  
}
```

### Employees

| **Method** | **Endpoint**        | **Access**  | **Description**      |
| ---------- | ------------------- | ----------- | -------------------- |
| GET        | /api/employees      | ADMIN, USER | List all employees   |
| GET        | /api/employees/{id} | ADMIN, USER | Get employee details |
| POST       | /api/employees      | ADMIN       | Create employee      |
| PUT        | /api/employees/{id} | ADMIN       | Update employee      |
| DELETE     | /api/employees/{id} | ADMIN       | Delete employee      |

**Employee Object**

Example employee request:

```JSON
{  
"firstName": "Maria",  
"lastName": "Papadopoulou",  
"email": "<maria.papadopoulou@test.com>",  
"jobTitle": "Software Engineer",  
"department": "IT",  
"phone": "+306901234567"  
} 
```

Main employee fields:

- First name
- Last name
- Email
- Job title
- Department
- Phone
- Created at
- Updated at

## Validation Rules

**Backend Validation**

The backend validates employee data before saving it.

Main validation rules:

- First name is required
- Last name is required
- Email is required
- Email must have a valid format
- Job title is required
- Field length limits are applied

**Frontend Validation**

The Angular frontend validates forms before sending requests to the backend.

Main frontend validation rules:

- First name is required
- Last name is required
- Email is required
- Email must have a valid format
- Job title is required
- Phone is optional, but if provided it must contain exactly 10 digits

For phone numbers, the user enters only the 10-digit Greek phone number. The frontend adds the +30 prefix before sending the data to the backend.

## Error Handling

The backend returns structured error responses for common cases such as:

- Validation errors
- Employee not found
- Duplicate email
- Invalid login credentials
- Unauthorized access
- Forbidden actions
- Unexpected server errors

The frontend displays API errors to the user where appropriate.

## Security

The application uses JWT-based stateless authentication.

Security flow:

- The user logs in with email and password.
- The backend validates the credentials.
- The backend returns a JWT token.
- The frontend stores the token.
- The token is sent with protected API requests.
- The backend validates the token and checks the user's role.

Authorization rules:

- ADMIN users can create, update, delete, and view employees.
- USER users can only view employees.

## Technical Choices

### Layered Backend Architecture

The backend follows a clean layered structure:

- Controller layer: handles HTTP requests and returns HTTP responses
- Service layer: contains business logic, validation checks, logging, and data preparation
- Repository layer: communicates with the database using Spring Data JPA
- DTO layer: defines request and response objects used by the API
- Security layer: manages JWT authentication and role-based access control
- Exception handling layer: returns consistent error responses for validation errors, missing resources, duplicate data, and authentication errors

This separation keeps the code easier to understand, test, and maintain.

### Spring Boot

Spring Boot was selected for the backend because it provides a structured and efficient way to build REST APIs with Java. It also integrates well with Spring Data JPA, validation, security, and dependency injection.

### Angular

Angular was selected for the frontend because it provides a structured framework for building single-page applications with TypeScript, routing, services, forms, and validation.

### DTO Usage

The API uses request and response DTOs instead of exposing the database entity directly. This improves separation between the internal data model and the API contract.

### H2 Database

H2 was selected to simplify local setup and evaluation. It allows the application to run without requiring an external database installation.

### JWT Authentication

JWT was used to implement stateless authentication, which is suitable for REST APIs and frontend-backend applications.

### Role-Based Authorization

Role-based access control was implemented to separate admin actions from regular user actions.

## How to Test the Application

- Start the backend.
- Start the frontend.
- Open the application in the browser:
` http://localhost:4200 `
- Login as admin:

<admin@test.com> / Admin123!

- Create a new employee.
- View the employee list.
- Open employee details.
- Edit the employee.
- Delete the employee.
- Logout.
- Login as regular user:

<user@test.com> / User123!

- Confirm that the regular user can view employees but cannot create, edit, or delete them.



Optional API testing can also be done through Swagger UI:

`
http://localhost:8080/swagger-ui/index.html`
