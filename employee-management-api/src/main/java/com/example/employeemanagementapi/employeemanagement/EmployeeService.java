package com.example.employeemanagementapi.employeemanagement;

import com.example.employeemanagementapi.common.DuplicateResourceException;
import com.example.employeemanagementapi.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    /*
     *  fields  allowed for sorting.
     */
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "firstName",
            "lastName",
            "email",
            "jobTitle",
            "department",
            "createdAt",
            "updatedAt"
    );
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees() {
        log.info("Fetching all employees");

        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
     *  method for searching and sorting employees.
     */
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees(String search, String sortBy, String direction) {
        log.info("Fetching employees with search={}, sortBy={}, direction={}", search, sortBy, direction);

        String safeSortBy = validateSortField(sortBy);
        Sort.Direction sortDirection = resolveSortDirection(direction);

        Sort sort = Sort.by(sortDirection, safeSortBy);

        String normalizedSearch = normalizeOptionalText(search);

        return employeeRepository.searchEmployees(normalizedSearch, sort)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EmployeeResponse getEmployeeById(Long id) {
        log.info("Fetching employee with id={}", id);

        Employee employee = findEmployeeById(id);

        return mapToResponse(employee);
    }

    public EmployeeResponse createEmployee(EmployeeRequest request) {
        String email = normalizeEmail(request.getEmail());

        log.info("Creating employee with email={}", email);

        validateEmailIsUnique(email);

        Employee employee = Employee.builder()
                .firstName(normalizeText(request.getFirstName()))
                .lastName(normalizeText(request.getLastName()))
                .email(email)
                .jobTitle(normalizeText(request.getJobTitle()))
                .department(normalizeOptionalText(request.getDepartment()))
                .phone(normalizeOptionalText(request.getPhone()))
                .build();

        Employee savedEmployee = employeeRepository.save(employee);

        log.info("Employee created successfully with id={}", savedEmployee.getId());

        return mapToResponse(savedEmployee);
    }

    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        log.info("Updating employee with id={}", id);

        Employee employee = findEmployeeById(id);

        String email = normalizeEmail(request.getEmail());

        validateEmailIsUniqueForUpdate(email, id);

        employee.setFirstName(normalizeText(request.getFirstName()));
        employee.setLastName(normalizeText(request.getLastName()));
        employee.setEmail(email);
        employee.setJobTitle(normalizeText(request.getJobTitle()));
        employee.setDepartment(normalizeOptionalText(request.getDepartment()));
        employee.setPhone(normalizeOptionalText(request.getPhone()));

        Employee updatedEmployee = employeeRepository.save(employee);

        log.info("Employee updated successfully with id={}", updatedEmployee.getId());

        return mapToResponse(updatedEmployee);
    }

    public void deleteEmployee(Long id) {
        log.info("Deleting employee with id={}", id);

        Employee employee = findEmployeeById(id);

        employeeRepository.delete(employee);

        log.info("Employee deleted successfully with id={}", id);
    }

    private Employee findEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Employee not found with id={}", id);
                    return new ResourceNotFoundException("Employee with id " + id + " was not found");
                });
    }

    private void validateEmailIsUnique(String email) {
        if (employeeRepository.existsByEmail(email)) {
            log.warn("Employee email already exists: {}", email);
            throw new DuplicateResourceException("Employee with email " + email + " already exists");
        }
    }

    private void validateEmailIsUniqueForUpdate(String email, Long employeeId) {
        employeeRepository.findByEmail(email)
                .filter(existingEmployee -> !existingEmployee.getId().equals(employeeId))
                .ifPresent(existingEmployee -> {
                    log.warn("Employee email already exists: {}", email);
                    throw new DuplicateResourceException("Employee with email " + email + " already exists");
                });
    }

    /*
     * Validates the requested sort field.
     */
    private String validateSortField(String sortBy) {
        if (sortBy == null || sortBy.trim().isEmpty()) {
            return "createdAt";
        }

        String normalizedSortBy = sortBy.trim();

        if (!ALLOWED_SORT_FIELDS.contains(normalizedSortBy)) {
            log.warn("Invalid sort field requested: {}. Falling back to createdAt", sortBy);
            return "createdAt";
        }

        return normalizedSortBy;
    }

    /*
     * Resolves the sorting direction.
     */
    private Sort.Direction resolveSortDirection(String direction) {
        if (direction == null || direction.trim().isEmpty()) {
            return Sort.Direction.ASC;
        }

        try {
            return Sort.Direction.fromString(direction);
        } catch (IllegalArgumentException ex) {
            log.warn("Invalid sort direction requested: {}. Falling back to ASC", direction);
            return Sort.Direction.ASC;
        }
    }


    private EmployeeResponse mapToResponse(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .jobTitle(employee.getJobTitle())
                .department(employee.getDepartment())
                .phone(employee.getPhone())
                .createdAt(employee.getCreatedAt())
                .updatedAt(employee.getUpdatedAt())
                .build();
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    private String normalizeText(String text) {
        return text.trim();
    }

    private String normalizeOptionalText(String text) {
        if (text == null || text.trim().isEmpty()) {
            return null;
        }

        return text.trim();
    }
}