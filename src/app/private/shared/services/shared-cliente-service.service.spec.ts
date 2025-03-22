import { TestBed } from '@angular/core/testing';

import { SharedClienteServiceService } from './shared-cliente-service.service';

describe('SharedClienteServiceService', () => {
  let service: SharedClienteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedClienteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
