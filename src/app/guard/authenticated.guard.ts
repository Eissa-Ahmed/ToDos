import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { IUser } from '../interfaces/iuser';

export const authenticatedGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user: IUser | null = authService.getUser();
  const isAuthenticated = authService.isAuthenticated$();

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};

