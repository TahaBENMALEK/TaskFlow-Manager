# TaskFlow - Project & Task Management System

A full-stack web application for managing projects and tasks with authentication, progress tracking, and real-time updates.

## 🎥 Demo Video

[📹 Watch Demo Video](https://drive.google.com/drive/folders/1Pt-8dXf4zSbW6mk5Gv5KO_FMC3sviX8P?usp=drive_link)

---

## 📋 Features

- 🔐 Secure JWT authentication
- 📊 Project management with progress tracking
- ✅ Task creation, completion, and deletion
- 📈 Real-time progress calculation
- 🎨 Modern, responsive UI
- 🐳 Docker containerization
- 🧪 Comprehensive test coverage

---

## 🛠️ Technologies Used

### Backend
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** PostgreSQL 15
- **Security:** Spring Security with JWT
- **ORM:** JPA/Hibernate
- **Testing:** JUnit 5, Mockito, H2
- **Documentation:** Swagger/OpenAPI
- **Build Tool:** Maven 3.6+

### Frontend
- **Framework:** Angular 19
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4
- **HTTP Client:** Angular HttpClient
- **State Management:** RxJS

### DevOps
- **Containerization:** Docker, Docker Compose
- **Web Server:** Nginx (production)

---

## 📁 Project Structure

```
TaskFlow-Manager/
├── Backend-TaskFlow/              # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/taskflow/
│   │   │   │   ├── config/           # Security, CORS, Swagger
│   │   │   │   ├── controller/       # REST endpoints
│   │   │   │   ├── dto/              # Data transfer objects
│   │   │   │   ├── exception/        # Error handling
│   │   │   │   ├── model/            # JPA entities
│   │   │   │   ├── repository/       # Data access
│   │   │   │   ├── security/         # JWT utilities
│   │   │   │   └── service/          # Business logic
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       └── application-prod.properties
│   │   └── test/                     # Unit & integration tests
│   ├── Dockerfile
│   ├── pom.xml
│   └── README.md
│
├── Frontend-TaskFlow/             # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/          # UI components
│   │   │   ├── guards/              # Route protection
│   │   │   ├── interceptors/        # HTTP interceptor
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   └── services/            # API services
│   │   ├── environments/            # Environment configs
│   │   └── styles.scss
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml             # Container orchestration
├── .env.example                   # Environment template
├── .env.production               # Production template
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** (Recommended) OR
- **Java 17+, Node.js 18+, Maven 3.6+, PostgreSQL 15+** (Manual setup)

---

## 🐳 Option 1: Docker Deployment (Recommended)

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/TaskFlow-Manager.git
cd TaskFlow-Manager
```

### Step 2: Setup Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and update passwords/secrets
# (Optional - defaults work for local development)
```

### Step 3: Start All Services

```bash
# Build and start everything (database, backend, frontend)
docker-compose up --build
```

**Wait 1-2 minutes for all services to start and pass health checks.**

### Step 4: Access Application

- **Frontend:** http://localhost
- **Backend API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui/index.html

### Step 5: Login

```
Email: taha@helala.com
Password: password123
```

### Docker Commands

```bash
# Start in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Clean restart (removes database data)
docker-compose down -v && docker-compose up --build
```

---

## 💻 Option 2: Manual Setup

### Step 1: Database Setup

**Option A: Docker PostgreSQL**

```bash
# Start only database
docker-compose up -d postgres
```

**Option B: Local PostgreSQL**

```sql
CREATE DATABASE taskflow;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE taskflow TO admin;
```

### Step 2: Backend Setup

```bash
cd Backend-TaskFlow

# Create application-dev.properties
cat > src/main/resources/application-dev.properties << EOF
spring.datasource.url=jdbc:postgresql://localhost:5433/taskflow
spring.datasource.username=admin
spring.datasource.password=admin123
jwt.secret=3f4428472b4b6150645367566b597033733676397924423f4528482b4d625065
jwt.expiration=86400000
EOF

# Run backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**PowerShell users:**
```powershell
mvn spring-boot:run '-Dspring-boot.run.profiles=dev'
```

**Verify:**
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui/index.html

### Step 3: Frontend Setup

```bash
cd Frontend-TaskFlow

# Install dependencies
npm install

# Start development server
ng serve
```

**Access:** http://localhost:4200

### Step 4: Login

```
Email: taha@helala.com
Password: password123
```

---

## 🧪 Testing

### Backend Tests

```bash
cd Backend-TaskFlow
mvn test
```

**Test Coverage:**
- 16 tests (unit + integration)
- Service layer tests with Mockito
- Controller integration tests with H2 database
- JWT authentication tests

### Frontend Tests

```bash
cd Frontend-TaskFlow
ng test
```

---

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

---

## 📝 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User authentication | No |
| GET | `/api/projects` | List all projects | Yes |
| POST | `/api/projects` | Create project | Yes |
| GET | `/api/projects/{id}` | Get project details | Yes |
| DELETE | `/api/projects/{id}` | Delete project | Yes |
| GET | `/api/projects/{id}/progress` | Get progress | Yes |
| GET | `/api/projects/{id}/tasks` | List tasks | Yes |
| POST | `/api/projects/{id}/tasks` | Create task | Yes |
| PATCH | `/api/projects/{id}/tasks/{taskId}/toggle` | Toggle completion | Yes |
| DELETE | `/api/projects/{id}/tasks/{taskId}` | Delete task | Yes |

---

## 🏗️ Architecture Highlights

### Backend Architecture
- **Layered Architecture:** Controller → Service → Repository
- **SOLID Principles:** Dependency injection, single responsibility
- **Security:** JWT stateless authentication with Spring Security filter chain
- **Validation:** Bean Validation with custom error handling
- **Documentation:** Auto-generated OpenAPI 3.0 specs

### Frontend Architecture
- **Component-Based:** Standalone components (Angular 19)
- **Reactive:** RxJS observables for async operations
- **Type-Safe:** TypeScript interfaces for all models
- **Guards & Interceptors:** Route protection and JWT injection
- **Responsive:** Mobile-first Tailwind CSS

---

## 🔒 Security Features

- **Authentication:** JWT Bearer tokens
- **Password Hashing:** BCrypt with salt
- **CSRF Protection:** Disabled (stateless API)
- **CORS:** Configured for frontend origin
- **Route Guards:** Frontend route protection
- **HTTP Interceptor:** Automatic token injection
- **Error Handling:** Secure error messages

---

## 🐛 Troubleshooting

### Docker Issues

**Port already in use:**
```bash
# Change ports in docker-compose.yml
# Frontend: 80 → 8081
# Backend: 8080 → 8082
# Database: 5433 → 5434
```

**Services not healthy:**
```bash
# Check logs
docker-compose logs backend
docker-compose logs postgres

# Restart specific service
docker-compose restart backend
```

### Backend Issues

**Database connection failed:**
- Verify PostgreSQL is running
- Check credentials in `application-dev.properties`
- Ensure port 5433 is not blocked

**Tests failing:**
- Run `mvn clean test`
- Check H2 dependency is present

### Frontend Issues

**CORS errors:**
- Verify backend CORS allows `http://localhost:4200`
- Check backend is running on port 8080

**Compilation errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Documentation

- **Backend Details:** [Backend-TaskFlow/README.md](Backend-TaskFlow/README.md)
- **Frontend Details:** [Frontend-TaskFlow/README.md](Frontend-TaskFlow/README.md)
- **API Documentation:** http://localhost:8080/swagger-ui/index.html (when running)

---

## 🎯 Functional Requirements Coverage

✅ **Authentication**
- Login with email/password
- JWT token issuance
- Protected API routes

✅ **Projects Management**
- Create project (title + description)
- List user projects
- View project details
- Delete projects

✅ **Tasks Management**
- Create task (title, description, due date)
- Mark task as completed
- Delete task
- List project tasks

✅ **Progress Tracking**
- Total tasks count
- Completed tasks count
- Progress percentage calculation

✅ **Bonus Features Implemented**
- Docker Compose setup
- Unit & integration tests
- Clean architecture with SOLID principles
- Comprehensive documentation

---

## 👤 Default Users

The application comes with pre-seeded test users:

```
User 1:
Email: taha@helala.com
Password: password123

User 2:
Email: test@helala.com
Password: password123
```

---

## 🤝 Contributing

This is a technical assessment project. For questions or feedback, please open an issue on GitHub.

---

## 📄 License

MIT License - Free for educational and personal use.

---

## 📧 Contact

For questions about this project, please open a GitHub issue.

---

**Built with ❤️ using Spring Boot, Angular, and Docker**