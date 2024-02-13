/*
* Project Name: authguard.guard.spec.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authguardGuard } from './authguard.guard';

describe('authguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
