/**
 * authGuard
 * Functional route guard that checks authentication status
 * Redirects to login if user is not authenticated
 */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect unauthenticated users to login
  router.navigate(['/login']);
  return false;
};
