import { TestBed } from '@angular/core/testing';

import { SharedPedidoService } from './shared-pedido.service';

describe('SharedPedidoService', () => {
  let service: SharedPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
