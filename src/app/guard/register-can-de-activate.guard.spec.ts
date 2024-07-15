import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { registerCanDeActivateGuard } from './register-can-de-activate.guard';

describe('registerCanDeActivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerCanDeActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
