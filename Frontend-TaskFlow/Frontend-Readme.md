# TaskFlow Frontend

Modern Angular web application for project and task management with real-time progress tracking.

---

## 🛠️ Tech Stack

- **Framework:** Angular 19 (Standalone Components)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4
- **HTTP:** Angular HttpClient
- **State Management:** RxJS 7.8
- **Build Tool:** Angular CLI 19

---

## 📁 Project Structure

```
src/
├── environments/
│   ├── environment.ts               # Development config
│   └── environment.prod.ts          # Production config
└── app/
    ├── components/
    │   ├── login/
    │   │   ├── login.component.ts        # Login form with validation
    │   │   ├── login.component.html      # Template
    │   │   └── login.component.scss      # Styles (empty - using Tailwind)
    │   ├── projects/
    │   │   ├── projects.component.ts     # Projects dashboard
    │   │   ├── projects.component.html   # Project cards with progress
    │   │   └── projects.component.scss   # Styles
    │   └── project-detail/
    │       ├── project-detail.component.ts   # Task management
    │       ├── project-detail.component.html # Task list UI
    │       └── project-detail.component.scss # Styles
    ├── guards/
    │   └── auth.guard.ts                # Protects routes (redirects if not logged in)
    ├── interceptors/
    │   └── auth.interceptor.ts          # Injects JWT in every HTTP request
    ├── models/
    │   ├── api-error.model.ts           # Error response types
    │   ├── auth.model.ts                # Login request/response
    │   ├── project.model.ts             # Project interface
    │   ├── task.model.ts                # Task interface
    │   └── user.model.ts                # User interface
    ├── services/
    │   ├── auth.service.ts              # JWT authentication logic
    │   ├── project.service.ts           # Project API calls
    │   └── task.service.ts              # Task API calls
    ├── app.component.ts                 # Root component
    ├── app.config.ts                    # App configuration (providers)
    └── app.routes.ts                    # Route definitions
```

---

## 🚀 Setup & Run

### Prerequisites

- **Node.js 18+**
- **npm 10+**
- **Backend running** on http://localhost:8080

---

### Step 1: Install Dependencies

```bash
cd Frontend-TaskFlow
npm install
```

**First time setup takes 1-2 minutes.**

---

### Step 2: Configure API URL

Verify `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

**This should already be configured correctly.**

---

### Step 3: Start Development Server

```bash
ng serve
```

**Or with specific port:**
```bash
ng serve --port 4200
```

---

### Step 4: Access Application

Open browser: **http://localhost:4200**

---

### Step 5: Login

```
Email: taha@helala.com
Password: password123
```

---

## 🎨 Features

### Authentication
- ✅ Login form with real-time validation
- ✅ JWT token storage in localStorage
- ✅ Auto-logout on token expiration
- ✅ Protected routes with auth guard
- ✅ Secure HTTP interceptor

### Projects Dashboard
- ✅ View all user projects
- ✅ Create new project (modal dialog)
- ✅ Delete project with confirmation
- ✅ Visual progress bars (color-coded)
- ✅ Empty state with call-to-action
- ✅ Navigate to project details

### Project Detail Page
- ✅ View project information
- ✅ Real-time progress metrics
- ✅ Create tasks with due dates
- ✅ Toggle task completion (checkbox)
- ✅ Delete tasks with confirmation
- ✅ Overdue task highlighting (red)
- ✅ Tasks sorted by due date
- ✅ Back navigation to dashboard

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading indicators
- ✅ Error messages
- ✅ Success feedback
- ✅ Smooth animations
- ✅ Confirmation dialogs

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- **Blue (#3B82F6):** Trust, productivity, focus
- **Green (#10B981):** Success, completion, achievement

**Usage:**
- Login page: Blue gradient background
- Buttons: Blue (primary actions)
- Progress bars: Yellow (0-49%), Blue (50-99%), Green (100%)
- Completed tasks: Green checkboxes
- Overdue tasks: Red text

### Typography

- **Font:** Inter (from Google Fonts)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing

Tailwind spacing scale: `p-4`, `mb-6`, `space-y-3`, etc.

---

## 🏗️ Architecture

### Component Design

**Smart Components:**
- `LoginComponent` - Handles authentication logic
- `ProjectsComponent` - Manages projects list
- `ProjectDetailComponent` - Manages tasks

All use **standalone components** (Angular 19 best practice).

### State Management

**Auth State:**
```typescript
// BehaviorSubject in AuthService
currentUser$: Observable<User | null>
```

**HTTP Calls:**
```typescript
// Services return Observables
getProjects(): Observable<Project[]>
```

**Components subscribe:**
```typescript
this.projectService.getProjects().subscribe({
  next: (projects) => this.projects = projects,
  error: (err) => this.handleError(err)
});
```

### Routing

```typescript
// app.routes.ts
{
  path: 'login',
  loadComponent: () => import('./components/login/...')
},
{
  path: 'projects',
  loadComponent: () => import('./components/projects/...'),
  canActivate: [authGuard]  // Protected route
}
```

**Lazy Loading:** Components loaded on-demand for faster initial load.

---

## 🔒 Security

### Authentication Flow

1. **User logs in** → `AuthService.login()`
2. **Backend returns JWT** → Stored in `localStorage`
3. **All API calls** → `AuthInterceptor` adds `Authorization: Bearer <token>`
4. **Token expires** → Auto-logout on 401 error

### Route Protection

```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
```

### HTTP Interceptor

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```

---

## 📦 Build

### Development Build

```bash
ng build
```

Output: `dist/frontend-task-flow/browser/`

### Production Build

```bash
ng build --configuration production
```

**Optimizations:**
- AOT compilation
- Tree shaking
- Minification
- Code splitting

---

## 🧪 Testing

### Unit Tests

```bash
ng test
```

Runs with **Karma** test runner.

### E2E Tests

```bash
ng e2e
```

*(Requires E2E framework installation)*

---

## 🐳 Docker

The frontend is served with **Nginx** in production.

### Build Docker Image

```bash
docker build -t taskflow-frontend .
```

### Run Container

```bash
docker run -d -p 80:80 taskflow-frontend
```

### With Docker Compose

```bash
# From project root
docker-compose up frontend
```

---

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile Features

- Touch-friendly buttons (larger tap targets)
- Collapsible navigation
- Optimized layouts
- Reduced padding on small screens

### Test Responsive

```bash
# Resize browser window OR
# Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
```

---

## 🔧 Development Tips

### Hot Reload

Changes to `.ts`, `.html`, `.scss` files auto-reload the browser.

### Debugging

**Browser DevTools:**
- **Console:** View errors and logs
- **Network:** Inspect API calls
- **Application:** View localStorage (JWT token)

**Angular DevTools:**
Install Chrome extension for component inspection.

### Code Generation

```bash
# Generate new component
ng generate component components/my-component

# Generate service
ng generate service services/my-service

# Generate guard
ng generate guard guards/my-guard
```

---

## 🐛 Troubleshooting

### Backend connection errors

**Symptom:** API calls fail with CORS errors

**Solution:**
1. Verify backend is running on `http://localhost:8080`
2. Check backend CORS config allows `http://localhost:4200`
3. Verify `environment.ts` has correct `apiUrl`

### Token expired

**Symptom:** Redirected to login after being logged in

**Solution:** Tokens expire after 24 hours. Login again.

**Clear manually:**
```javascript
// Browser console
localStorage.removeItem('taskflow_token');
localStorage.removeItem('taskflow_user');
```

### Compilation errors

**Symptom:** `ng serve` fails

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind not working

**Symptom:** CSS classes not applying

**Solution:**
1. Verify `styles.scss` has `@tailwind` directives
2. Check `tailwind.config.js` content paths
3. Restart dev server

---

## 📊 Performance

### Bundle Size (Production)

- **Initial:** ~115 KB (gzipped)
- **Lazy chunks:** 16-40 KB each
- **Total:** ~200 KB for full app

### Optimization Techniques

1. **Lazy loading:** Routes loaded on-demand
2. **AOT compilation:** Faster runtime
3. **Tree shaking:** Unused code removed
4. **Code splitting:** Vendor chunks separate

---

## 🎯 Browser Support

- **Chrome:** Latest
- **Firefox:** Latest
- **Safari:** Latest
- **Edge:** Latest

**Note:** Tailwind CSS uses modern CSS features (CSS Grid, Flexbox).

---

## 📚 Key Dependencies

```json
{
  "@angular/core": "^19.0.0",
  "@angular/common": "^19.0.0",
  "@angular/router": "^19.0.0",
  "@angular/forms": "^19.0.0",
  "rxjs": "~7.8.0",
  "tailwindcss": "^3.4.1",
  "typescript": "~5.6.2"
}
```

---

## 🔄 Update Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Or use Angular CLI
ng update
```

---

## 📈 Future Enhancements

Potential features for future versions:

- [ ] Edit project/task details
- [ ] Search and filter projects
- [ ] Sort tasks by different criteria
- [ ] Due date notifications
- [ ] Dark mode toggle
- [ ] Drag-and-drop task reordering
- [ ] Task categories/tags
- [ ] Export project data

---

**For backend integration details, see [Backend-TaskFlow/README.md](../Backend-TaskFlow/README.md)**

**For overall project setup, see [root README.md](../README.md)**
