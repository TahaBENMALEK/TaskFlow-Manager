package com.example.taskflow;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Basic smoke test to verify Spring context loads correctly
 * Uses H2 in-memory database with test profile
 */
@SpringBootTest
@ActiveProfiles("test")
class TaskFlowApplicationTests {

    @Test
    void contextLoads() {
        // This test verifies that the Spring application context loads successfully
        // All beans are properly configured and dependencies are satisfied
    }
}