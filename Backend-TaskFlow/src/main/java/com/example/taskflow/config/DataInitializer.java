package com.example.taskflow.config;

import com.example.taskflow.model.User;
import com.example.taskflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            // Create test users
            createUser("taha@inpt.com", "password123", "Taha BENMALEK");
            createUser("test@helala.com", "password123", "Vamos HB07)");

            log.info("✅ Test users created successfully");
            log.info("📧 Email: taha@inpt.com | Password: password123");
            log.info("📧 Email: test@helala.com | Password: password123");
        }
    }

    private void createUser(String email, String password, String fullName) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        userRepository.save(user);
    }
}