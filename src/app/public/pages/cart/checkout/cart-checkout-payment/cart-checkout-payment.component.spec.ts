import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutPaymentComponent } from './cart-checkout-payment.component';

describe('CartCheckoutPaymentComponent', () => {
  let component: CartCheckoutPaymentComponent;
  let fixture: ComponentFixture<CartCheckoutPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartCheckoutPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCheckoutPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
