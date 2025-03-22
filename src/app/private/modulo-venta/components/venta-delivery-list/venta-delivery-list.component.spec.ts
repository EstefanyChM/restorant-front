import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDeliveryListComponent } from './venta-delivery-list.component';

describe('VentaDeliveryListComponent', () => {
  let component: VentaDeliveryListComponent;
  let fixture: ComponentFixture<VentaDeliveryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaDeliveryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaDeliveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
