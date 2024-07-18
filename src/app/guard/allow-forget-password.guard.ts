import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

export const allowForgetPasswordGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const value = await firstValueFrom(authService.getAllowResetPassword().pipe(
    map((allow) => {
      return allow;
    })
  ));

  return value;
};
