import { TestBed } from '@angular/core/testing';

import { PagoService } from './pago.service';

describe('MercadoPagoService', () => {
  let service: PagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
