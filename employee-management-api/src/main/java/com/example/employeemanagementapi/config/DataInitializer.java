package com.example.employeemanagementapi.config;

import com.example.employeemanagementapi.user.AppUser;
import com.example.employeemanagementapi.user.AppUserRepository;
import com.example.employeemanagementapi.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * It creates Admin and User test sample
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) {
        createUserIfNotExists("admin@test.com", "Admin123!", Role.ADMIN);
        createUserIfNotExists("user@test.com", "User123!", Role.USER);
    }


    private void createUserIfNotExists(String email, String rawPassword, Role role) {
        if (appUserRepository.existsByEmail(email)) {
            return;
        }

        AppUser user = AppUser.builder()
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .role(role)
                .build();

        appUserRepository.save(user);
    }
}