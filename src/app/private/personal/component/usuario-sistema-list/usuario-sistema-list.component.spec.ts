import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSistemaListComponent } from './usuario-sistema-list.component';

describe('UsuarioSistemaListComponent', () => {
  let component: UsuarioSistemaListComponent;
  let fixture: ComponentFixture<UsuarioSistemaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioSistemaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioSistemaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
