import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRegisterCheckoutComponent } from './pedido-register-checkout.component';

describe('PedidoRegisterCheckoutComponent', () => {
  let component: PedidoRegisterCheckoutComponent;
  let fixture: ComponentFixture<PedidoRegisterCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoRegisterCheckoutComponent]
    });
    fixture = TestBed.createComponent(PedidoRegisterCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
