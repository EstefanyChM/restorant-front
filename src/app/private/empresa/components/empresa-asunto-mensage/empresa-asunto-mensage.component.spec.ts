import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAsuntoMensageComponent } from './empresa-asunto-mensage.component';

describe('EmpresaAsuntoMensageComponent', () => {
  let component: EmpresaAsuntoMensageComponent;
  let fixture: ComponentFixture<EmpresaAsuntoMensageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaAsuntoMensageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaAsuntoMensageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
