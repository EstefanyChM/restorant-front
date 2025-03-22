import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaMesaComponent } from './empresa-mesa.component';

describe('EmpresaMesaComponent', () => {
  let component: EmpresaMesaComponent;
  let fixture: ComponentFixture<EmpresaMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
