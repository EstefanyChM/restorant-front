import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPedidoMultipleComponent } from './pedido-pedido-multiple.component';

describe('PedidoPedidoMultipleComponent', () => {
  let component: PedidoPedidoMultipleComponent;
  let fixture: ComponentFixture<PedidoPedidoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoPedidoMultipleComponent]
    });
    fixture = TestBed.createComponent(PedidoPedidoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
