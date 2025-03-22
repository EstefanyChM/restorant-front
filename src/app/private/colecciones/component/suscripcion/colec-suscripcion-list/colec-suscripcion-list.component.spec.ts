import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColecSuscripcionListComponent } from './colec-suscripcion-list.component';

describe('ColecSuscripcionListComponent', () => {
  let component: ColecSuscripcionListComponent;
  let fixture: ComponentFixture<ColecSuscripcionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColecSuscripcionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColecSuscripcionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
