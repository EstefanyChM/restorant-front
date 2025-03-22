import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaVentaListComponent } from './venta-venta-list.component';

describe('VentaVentaListComponent', () => {
  let component: VentaVentaListComponent;
  let fixture: ComponentFixture<VentaVentaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentaVentaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaVentaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
