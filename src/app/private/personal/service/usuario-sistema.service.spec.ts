import { TestBed } from '@angular/core/testing';

import { UsuarioSistemaService } from './usuario-sistema.service';

describe('UsuarioSistemaService', () => {
  let service: UsuarioSistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioSistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
