import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDiscountOrderComponent } from './promotion-discount-order.component';

describe('PromotionDiscountOrderComponent', () => {
  let component: PromotionDiscountOrderComponent;
  let fixture: ComponentFixture<PromotionDiscountOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionDiscountOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionDiscountOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
