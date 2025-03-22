import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDatesComponent } from './empresa-dates.component';

describe('EmpresaDatesComponent', () => {
  let component: EmpresaDatesComponent;
  let fixture: ComponentFixture<EmpresaDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaDatesComponent]
    });
    fixture = TestBed.createComponent(EmpresaDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
