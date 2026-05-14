package com.example.employeemanagementapi.employeemanagement;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class EmployeeResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String jobTitle;

    private String department;

    private String phone;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}