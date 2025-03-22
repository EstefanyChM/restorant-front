import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaMesaDetallesComponent } from './mesa-mesa-detalles.component';

describe('MesaMesaDetallesComponent', () => {
  let component: MesaMesaDetallesComponent;
  let fixture: ComponentFixture<MesaMesaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaMesaDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaMesaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
