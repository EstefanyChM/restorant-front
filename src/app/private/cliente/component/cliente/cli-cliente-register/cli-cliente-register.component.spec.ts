import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliClienteRegisterComponent } from './cli-cliente-register.component';

describe('CliClienteRegisterComponent', () => {
  let component: CliClienteRegisterComponent;
  let fixture: ComponentFixture<CliClienteRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliClienteRegisterComponent]
    });
    fixture = TestBed.createComponent(CliClienteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
