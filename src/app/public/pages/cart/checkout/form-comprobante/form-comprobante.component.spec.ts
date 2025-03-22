import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComprobanteComponent } from './form-comprobante.component';

describe('FormComprobanteComponent', () => {
  let component: FormComprobanteComponent;
  let fixture: ComponentFixture<FormComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComprobanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
