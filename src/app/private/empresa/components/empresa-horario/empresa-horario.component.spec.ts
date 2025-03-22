import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaHorarioComponent } from './empresa-horario.component';

describe('EmpresaHorarioComponent', () => {
  let component: EmpresaHorarioComponent;
  let fixture: ComponentFixture<EmpresaHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
