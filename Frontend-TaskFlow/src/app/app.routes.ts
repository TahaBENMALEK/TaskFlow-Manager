import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Application routing configuration.
 * Implements lazy loading for better performance.
 * Protected routes use authGuard for access control.
 */
export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent)
  },

  // Protected routes - require authentication
  {
    path: 'projects',
    loadComponent: () => import('./components/projects/projects.component')
      .then(m => m.ProjectsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./components/project-detail/project-detail.component')
      .then(m => m.ProjectDetailComponent),
    canActivate: [authGuard]
  },

  // Default routes
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects' }
];
