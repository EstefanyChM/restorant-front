import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaPickupListComponent } from './venta-pickup-list.component';

describe('VentaPickupListComponent', () => {
  let component: VentaPickupListComponent;
  let fixture: ComponentFixture<VentaPickupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentaPickupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaPickupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
