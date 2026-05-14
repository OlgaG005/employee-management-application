package com.example.employeemanagementapi.auth;

import com.example.employeemanagementapi.user.Role;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class AuthResponse {

    private String token;

    private String email;

    private Role role;
}