import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { horarioGuard } from './horario.guard';

describe('horarioGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => horarioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
