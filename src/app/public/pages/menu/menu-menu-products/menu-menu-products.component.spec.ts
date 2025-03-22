import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMenuProductsComponent } from './menu-menu-products.component';

describe('MenuMenuProductsComponent', () => {
  let component: MenuMenuProductsComponent;
  let fixture: ComponentFixture<MenuMenuProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMenuProductsComponent]
    });
    fixture = TestBed.createComponent(MenuMenuProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
