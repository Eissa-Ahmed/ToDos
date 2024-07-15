import { HttpInterceptorFn } from '@angular/common/http';

export const versioningInterceptor: HttpInterceptorFn = (req, next) => {
  const req2 = req.clone({
    headers: req.headers.set('api-version', '1.0'),
  })
  return next(req2);
};
