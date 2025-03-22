import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaNuestrosServiciosComponent } from './empresa-nuestros-servicios.component';

describe('EmpresaNuestrosServiciosComponent', () => {
  let component: EmpresaNuestrosServiciosComponent;
  let fixture: ComponentFixture<EmpresaNuestrosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaNuestrosServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaNuestrosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
