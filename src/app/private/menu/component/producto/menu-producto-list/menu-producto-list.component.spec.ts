import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuproductoListComponent } from './menu-producto-list.component';

describe('MenuproductoListComponent', () => {
  let component: MenuproductoListComponent;
  let fixture: ComponentFixture<MenuproductoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuproductoListComponent]
    });
    fixture = TestBed.createComponent(MenuproductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
