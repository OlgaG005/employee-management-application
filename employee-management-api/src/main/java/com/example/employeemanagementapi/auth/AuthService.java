package com.example.employeemanagementapi.auth;

import com.example.employeemanagementapi.common.InvalidCredentialsException;
import com.example.employeemanagementapi.security.JwtService;
import com.example.employeemanagementapi.user.AppUser;
import com.example.employeemanagementapi.user.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service responsible for authentication logic.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        log.info("Login attempt for email={}", email);

        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("Login failed. User not found for email={}", email);
                    return new InvalidCredentialsException("Invalid email or password");
                });

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            log.warn("Login failed. Invalid password for email={}", email);
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        log.info("Login successful for email={} with role={}", email, user.getRole());

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}