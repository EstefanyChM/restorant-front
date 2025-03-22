import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMenuOrderComponent } from './menu-menu-order.component';

describe('MenuMenuOrderComponent', () => {
  let component: MenuMenuOrderComponent;
  let fixture: ComponentFixture<MenuMenuOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMenuOrderComponent]
    });
    fixture = TestBed.createComponent(MenuMenuOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
