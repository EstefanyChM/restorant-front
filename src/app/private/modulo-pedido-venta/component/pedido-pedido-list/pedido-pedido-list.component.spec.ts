import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPedidoListComponent } from './pedido-pedido-list.component';

describe('PedidoPedidoListComponent', () => {
  let component: PedidoPedidoListComponent;
  let fixture: ComponentFixture<PedidoPedidoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoPedidoListComponent]
    });
    fixture = TestBed.createComponent(PedidoPedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
