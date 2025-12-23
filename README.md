## 📋 Tools & Technologies

### Backend
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** PostgreSQL 15
- **Build Tool:** Maven 3.6+

### Frontend
- **Framework:** Angular 19
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4

### Database
- **Primary:** PostgreSQL (production)
- **Testing:** H2 in-memory database

---

## 🗄️ Database Setup

### Option 1: Docker (Recommended)
```bash
# Start PostgreSQL container
docker-compose up -d postgres

# Database will be created automatically
# Connection: localhost:5433
```

### Option 2: Local PostgreSQL

1. Install PostgreSQL 15+
2. Create database:
```sql
CREATE DATABASE taskflow;
CREATE USER admin WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE taskflow TO admin;
```

3. Update `Backend-TaskFlow/src/main/resources/application-dev.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskflow
spring.datasource.username=admin
spring.datasource.password=your_password
```

---

## 🚀 How to Run

### Backend

1. **Start Database:**
```bash
docker-compose up -d postgres
```

2. **Run Spring Boot:**
```bash
cd Backend-TaskFlow
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

3. **Verify:**
- Backend: http://localhost:8080
- API Docs: http://localhost:8080/swagger-ui/index.html

### Frontend

1. **Install dependencies:**
```bash
cd Frontend-TaskFlow
npm install
```

2. **Start dev server:**
```bash
ng serve
```

3. **Access application:**
- Frontend: http://localhost:4200

### Test Credentials
```
Email: taha@helala.com
Password: password123
```