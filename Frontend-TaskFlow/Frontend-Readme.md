# TaskFlow Frontend

Angular web application for project and task management.

## 🛠️ Tech Stack

- Angular 19
- TypeScript 5.6
- Tailwind CSS 3.4
- RxJS 7.8
- Angular HttpClient

## 📁 Project Structure
```
src/
├── environments/
│   └── environment.ts            # API configuration
└── app/
    ├── components/
    │   ├── login/
    │   │   ├── login.component.ts
    │   │   ├── login.component.html
    │   │   └── login.component.scss
    │   ├── projects/
    │   │   ├── projects.component.ts
    │   │   ├── projects.component.html
    │   │   └── projects.component.scss
    │   └── project-detail/
    │       ├── project-detail.component.ts
    │       ├── project-detail.component.html
    │       └── project-detail.component.scss
    ├── guards/
    │   └── auth.guard.ts             # Route protection
    ├── interceptors/
    │   └── auth.interceptor.ts       # JWT injection
    ├── models/
    │   ├── api-error.model.ts
    │   ├── auth.model.ts
    │   ├── project.model.ts
    │   ├── task.model.ts
    │   └── user.model.ts
    ├── services/
    │   ├── auth.service.ts           # Authentication logic
    │   ├── project.service.ts        # Project API calls
    │   └── task.service.ts           # Task API calls
    ├── app.component.ts
    ├── app.config.ts
    └── app.routes.ts
```

## 🚀 Setup

### 1. Prerequisites

- Node.js 18+
- npm 10+

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment

Create/edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### 4. Run Development Server
```bash
ng serve
```

Application runs on: http://localhost:4200

## 🎨 Features

### Authentication
- Login form with validation
- JWT token storage
- Auto-logout on token expiration
- Protected routes

### Projects
- Create new projects
- View all projects with progress
- Delete projects
- Progress visualization

### Tasks
- Create tasks with due dates
- Toggle completion status
- Delete tasks
- Overdue task highlighting
- Sorted by due date

### UI/UX
- Responsive design (mobile-first)
- Loading states
- Error handling
- Empty states
- Confirmation dialogs

## 🎨 Styling

### Color Palette

- **Primary Blue:** `#3B82F6` (Trust, productivity)
- **Accent Green:** `#10B981` (Success, completion)
- **Neutral Grays:** For text and backgrounds

### Tailwind Configuration

Custom theme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* blue shades */ },
      accent: { /* green shades */ }
    }
  }
}
```

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

## 📦 Build

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

Output: `dist/frontend-task-flow/`

## 🏗️ Architecture

### Component Design
- **Standalone components** (Angular 19 best practice)
- **Smart/Dumb pattern** for separation of concerns
- **Reactive forms** for validation

### State Management
- **BehaviorSubject** for auth state
- **Services** for shared state
- **RxJS operators** for data transformation

### Routing
- **Lazy loading** for performance
- **Auth guards** for protection
- **Query params** for state preservation

## 🔒 Security

- JWT tokens in localStorage
- HTTP interceptor adds Authorization header
- Route guards prevent unauthorized access
- Auto-logout on 401 errors

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Development Notes

- Port: 4200
- Hot reload enabled
- Source maps in dev mode
- AOT compilation in production

## 🐛 Troubleshooting

### CORS Errors
Ensure backend CORS allows `http://localhost:4200`

### Token Issues
Clear localStorage and login again

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Not Working
Ensure `tailwind.config.js` content paths include all component files:
```javascript
content: [
  "./src/**/*.{html,ts}",
]
```

---

**For issues or questions, check the root README or open a GitHub issue.**
