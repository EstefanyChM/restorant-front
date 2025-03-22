import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoriaRegisterComponent } from './menu-categoria-register.component';

describe('MenuCategoriaRegisterComponent', () => {
  let component: MenuCategoriaRegisterComponent;
  let fixture: ComponentFixture<MenuCategoriaRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCategoriaRegisterComponent]
    });
    fixture = TestBed.createComponent(MenuCategoriaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
