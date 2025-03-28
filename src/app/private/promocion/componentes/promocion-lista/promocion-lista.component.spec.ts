import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionListaComponent } from './promocion-lista.component';

describe('PromocionListaComponent', () => {
  let component: PromocionListaComponent;
  let fixture: ComponentFixture<PromocionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
