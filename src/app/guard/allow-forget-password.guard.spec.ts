import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allowForgetPasswordGuard } from './allow-forget-password.guard';

describe('allowForgetPasswordGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allowForgetPasswordGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
