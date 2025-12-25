# TaskFlow Backend

Spring Boot REST API for project and task management.

## 🛠️ Tech Stack

- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Swagger/OpenAPI
- JUnit 5 & Mockito

## 📁 Project Structure
```
src/main/java/com/example/taskflow/
├── config/
│   ├── CorsConfig.java           # CORS configuration
│   ├── DataInitializer.java      # Test data seeding
│   ├── OpenApiConfig.java        # Swagger configuration
│   └── SecurityConfig.java       # Security & JWT setup
├── controller/
│   ├── AuthController.java       # Authentication endpoints
│   ├── ProjectController.java    # Project CRUD
│   └── TaskController.java       # Task CRUD
├── dto/
│   ├── AuthResponse.java
│   ├── LoginRequest.java
│   ├── ProjectRequest.java
│   ├── ProjectResponse.java
│   ├── TaskRequest.java
│   └── TaskResponse.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
├── model/
│   ├── Project.java              # JPA entity
│   ├── Task.java                 # JPA entity
│   └── User.java                 # JPA entity (UserDetails)
├── repository/
│   ├── ProjectRepository.java
│   ├── TaskRepository.java
│   └── UserRepository.java
├── security/
│   ├── JwtAuthenticationFilter.java
│   └── JwtUtil.java              # JWT generation/validation
└── service/
    ├── AuthService.java
    ├── ProjectService.java
    ├── TaskService.java
    └── UserService.java
```

## 🚀 Setup

### 1. Prerequisites

- Java 17+
- Maven 3.6+
- PostgreSQL (or Docker)

### 2. Configuration

Create `application-dev.properties`:
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5433/taskflow
spring.datasource.username=your_username(or just rename .env.example to .env)
spring.datasource.password=your_password

# JWT
jwt.secret=your_secret_key_here
jwt.expiration=86400000
```

### 3. Run Application
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### 4. Access Swagger UI

http://localhost:8080/swagger-ui.html

## 🧪 Testing

### Run All Tests
```bash
mvn test
```

### Test Structure
```
src/test/java/com/example/taskflow/
├── controller/
│   └── AuthControllerTest.java   # Integration tests
└── service/
    ├── ProjectServiceTest.java   # Unit tests
    └── TaskServiceTest.java      # Unit tests
```

### Test Configuration

- H2 in-memory database
- `@ActiveProfiles("test")`
- Mockito for mocking dependencies

## 🔒 Security

- **Authentication:** JWT Bearer tokens
- **Password Hashing:** BCrypt
- **CORS:** Configured for Angular frontend
- **CSRF:** Disabled (stateless API)

## 📊 Database Schema
```sql
users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL
)

projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000),
  user_id BIGINT REFERENCES users(id),
  created_at TIMESTAMP NOT NULL
)

tasks (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(2000),
  due_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  project_id BIGINT REFERENCES projects(id),
  created_at TIMESTAMP NOT NULL
)
```

## 🐳 Docker

Build image:
```bash
docker build -t taskflow-backend .
```

Run with Docker Compose:
```bash
docker-compose up backend
```

## 📝 API Documentation

Full API documentation available at `/swagger-ui.html` when running.

## 🔧 Development Notes

- Port: 8080
- Profile: `dev` for local, `prod` for production
- Logs: Console output with formatted SQL
- Auto-reload: Use Spring DevTools

---

**For issues or questions, check the root README or open a GitHub issue.**