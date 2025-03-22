import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDiscountListComponent } from './promotion-discount-list.component';

describe('PromotionDiscountListComponent', () => {
  let component: PromotionDiscountListComponent;
  let fixture: ComponentFixture<PromotionDiscountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionDiscountListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
