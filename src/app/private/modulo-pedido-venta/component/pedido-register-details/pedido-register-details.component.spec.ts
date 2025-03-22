import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPedidoRegisterComponent } from './pedido-register-details.component';

describe('PedidoPedidoRegisterComponent', () => {
  let component: PedidoPedidoRegisterComponent;
  let fixture: ComponentFixture<PedidoPedidoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoPedidoRegisterComponent]
    });
    fixture = TestBed.createComponent(PedidoPedidoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
