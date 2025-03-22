import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionCrearComponent } from './promocion-crear.component';

describe('PromocionCrearComponent', () => {
  let component: PromocionCrearComponent;
  let fixture: ComponentFixture<PromocionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
