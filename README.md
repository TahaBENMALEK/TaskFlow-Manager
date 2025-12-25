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
- 🧪 Comprehensive test coverage (TDD approach)

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

## 🚀 Quick Start (Recommended)

### Prerequisites

- **Docker** and **Docker Compose** installed
- **Git** installed

---

### Step 1: Clone Repository

```bash
git clone https://github.com/TahaBENMALEK/TaskFlow-Manager.git
cd TaskFlow-Manager
```

---

### Step 2: Setup Environment

```bash
# Rename the environment template
cp .env.example .env
```

**IMPORTANT:** Edit `.env` and change the passwords/secrets. Here are some secure suggestions you can copy-paste:

#### 🔐 Suggested Secure Values (Copy These!)

**For Database:**
```properties
POSTGRES_USER=taskflow_admin
POSTGRES_PASSWORD=TF_P0stgr3s_S3cur3!2024
DB_USERNAME=taskflow_admin
DB_PASSWORD=TF_P0stgr3s_S3cur3!2024
```

**Alternative Database Passwords (choose one):**
- `MyT@skFlow_DB!2024`
- `Secur3_TaskDB#9876`
- `PostgreSQL!TaskFlow#2024`

**For JWT Secret (256-bit minimum - choose one):**
```properties
JWT_SECRET=7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b
```

**Alternative JWT Secrets:**
- `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2`
- `9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7`

💡 **Pro Tip:** Generate your own secure passwords using:
```bash
# On Linux/Mac
openssl rand -hex 32

# Or use online tools
https://passwordsgenerator.net/
```

---

### Step 3: Start Application

```bash
# Build and start all services (database, backend, frontend)
docker-compose up --build -d
```

**This single command will:**
- ✅ Build the backend Spring Boot application
- ✅ Build the frontend Angular application
- ✅ Start PostgreSQL database
- ✅ Initialize database schema
- ✅ Seed test data
- ✅ Start all services in background mode

**Wait 1-2 minutes for all services to start and pass health checks.**

---

### Step 4: Access Application

- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui/index.html

---

### Step 5: Login

```
Email: taha@helala.com
Password: password123
```

---

### Docker Management Commands

```bash
# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Clean restart (removes database data)
docker-compose down -v && docker-compose up --build -d
```

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
│   │   │       └── application-dev.properties
│   │   └── test/                     # Unit & integration tests
│   ├── Dockerfile
│   ├── pom.xml
│   └── Backend-Readme.md
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
│   └── Frontend-Readme.md
│
├── docker-compose.yml             # Container orchestration
├── .env.example                   # Environment template
├── .gitignore
└── README.md                      # This file
```

---

## 🧪 Testing

The application follows **Test-Driven Development (TDD)** principles.

### Backend Tests

```bash
cd Backend-TaskFlow
mvn test
```

**Test Coverage:**
- 23 tests (unit + integration)
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

## 🔓 API Endpoints

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

Full API documentation: http://localhost:8080/swagger-ui/index.html

---

## 🏗️ Architecture Highlights

### Backend Architecture
- **Layered Architecture:** Controller → Service → Repository
- **SOLID Principles:** Dependency injection, single responsibility
- **TDD Approach:** Tests written before implementation
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
- **Environment Variables:** All sensitive data externalized
- **CSRF Protection:** Disabled (stateless API)
- **CORS:** Configured for frontend origin
- **Route Guards:** Frontend route protection
- **HTTP Interceptor:** Automatic token injection
- **Error Handling:** Secure error messages (no sensitive data exposure)

---

## 🛠 Manual Setup (Without Docker)

If you prefer to run services manually:

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+
- PostgreSQL 15+

### Step 1: Database Setup

```sql
CREATE DATABASE taskflow;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE taskflow TO admin;
```

### Step 2: Configure Environment

```bash
# Rename and edit .env file
cp .env.example .env
# Edit .env with your database credentials
```

### Step 3: Backend

```bash
cd Backend-TaskFlow
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Verify:** http://localhost:8080/swagger-ui/index.html

### Step 4: Frontend

```bash
cd Frontend-TaskFlow
npm install
ng serve
```

**Access:** http://localhost:4200

---

## 🐛 Troubleshooting

### Port Already in Use

**Symptom:** `bind: Only one usage of each socket address...`

**Solution:**
```bash
# Check what's using the port
netstat -ano | findstr :8080

# Kill the process or change ports in docker-compose.yml
```

### Docker Services Not Healthy

```bash
# Check logs
docker-compose logs backend
docker-compose logs postgres

# Restart specific service
docker-compose restart backend
```

### Backend Connection Failed

- Verify PostgreSQL is running: `docker-compose ps`
- Check `.env` credentials match database
- Ensure port 5433 is not blocked

### Frontend CORS Errors

- Verify backend is running on port 8080
- Check backend CORS allows `http://localhost:4200` or `http://localhost`

---

## 📚 Additional Documentation

- **Backend Details:** [Backend-TaskFlow/Backend-Readme.md](Backend-TaskFlow/Backend-Readme.md)
- **Frontend Details:** [Frontend-TaskFlow/Frontend-Readme.md](Frontend-TaskFlow/Frontend-Readme.md)
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
- Unit & integration tests with TDD approach
- Clean architecture with SOLID principles
- Comprehensive documentation
- Environment variable configuration
- Swagger API documentation

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

For questions about this project, please open a GitHub issue, Assign yourself and choose me as a reviewer
or contact me via email: benmalektaha.inpt@gmail.com

---

**Built with ☕ using Spring Boot, JUnit, Angular, and Docker**