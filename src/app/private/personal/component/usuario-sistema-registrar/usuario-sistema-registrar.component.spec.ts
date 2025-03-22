import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSistemaRegistrarComponent } from './usuario-sistema-registrar.component';

describe('UsuarioSistemaRegistrarComponent', () => {
  let component: UsuarioSistemaRegistrarComponent;
  let fixture: ComponentFixture<UsuarioSistemaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioSistemaRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioSistemaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
