import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRegisterCustomerComponent } from './pedido-register-customer.component';

describe('PedidoRegisterCustomerComponent', () => {
  let component: PedidoRegisterCustomerComponent;
  let fixture: ComponentFixture<PedidoRegisterCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoRegisterCustomerComponent]
    });
    fixture = TestBed.createComponent(PedidoRegisterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
