import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';
import { catchError, throwError } from 'rxjs';

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem('token');
  const jwtService = inject(JwtService);
  if (token && jwtService.tokenIsValid()) {
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    return next(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }
  return next(req);
};
