import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuproductoRegisterComponent } from './menu-producto-register.component';

describe('MenuproductoRegisterComponent', () => {
  let component: MenuproductoRegisterComponent;
  let fixture: ComponentFixture<MenuproductoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuproductoRegisterComponent]
    });
    fixture = TestBed.createComponent(MenuproductoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
