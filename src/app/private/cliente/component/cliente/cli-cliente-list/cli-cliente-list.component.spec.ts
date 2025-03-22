import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliClienteListComponent } from './cli-cliente-list.component';

describe('CliClienteListComponent', () => {
  let component: CliClienteListComponent;
  let fixture: ComponentFixture<CliClienteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliClienteListComponent]
    });
    fixture = TestBed.createComponent(CliClienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
