import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { resolveHomeResolver } from './resolve-home.resolver';

describe('resolveHomeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => resolveHomeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
