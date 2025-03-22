import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPerfilComponent } from './customer-perfil.component';

describe('CustomerPerfilComponent', () => {
  let component: CustomerPerfilComponent;
  let fixture: ComponentFixture<CustomerPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPerfilComponent]
    });
    fixture = TestBed.createComponent(CustomerPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
