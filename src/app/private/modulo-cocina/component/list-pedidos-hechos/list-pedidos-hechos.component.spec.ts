import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPedidosHechosComponent } from './list-pedidos-hechos.component';

describe('ListPedidosHechosComponent', () => {
  let component: ListPedidosHechosComponent;
  let fixture: ComponentFixture<ListPedidosHechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPedidosHechosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPedidosHechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
