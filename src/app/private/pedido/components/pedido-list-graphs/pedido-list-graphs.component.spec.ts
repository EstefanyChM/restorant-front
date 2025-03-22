import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoListGraphsComponent } from './pedido-list-graphs.component';

describe('PedidoListGraphsComponent', () => {
  let component: PedidoListGraphsComponent;
  let fixture: ComponentFixture<PedidoListGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoListGraphsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoListGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
