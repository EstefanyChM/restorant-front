import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaTipoPagoComponent } from './venta-tipo-pago.component';

describe('VentaTipoPagoComponent', () => {
  let component: VentaTipoPagoComponent;
  let fixture: ComponentFixture<VentaTipoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaTipoPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
