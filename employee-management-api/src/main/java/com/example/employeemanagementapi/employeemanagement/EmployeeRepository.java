package com.example.employeemanagementapi.employeemanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);


    @Query("""
        SELECT e FROM Employee e
        WHERE :search IS NULL
           OR :search = ''
           OR LOWER(e.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(e.email) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(e.jobTitle) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(e.department) LIKE LOWER(CONCAT('%', :search, '%'))
        """)
    List<Employee> searchEmployees(@Param("search") String search, Sort sort);
}