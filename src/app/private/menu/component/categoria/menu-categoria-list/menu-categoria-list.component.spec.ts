import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoriaListComponent } from './menu-categoria-list.component';

describe('MenuCategoriaListComponent', () => {
  let component: MenuCategoriaListComponent;
  let fixture: ComponentFixture<MenuCategoriaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCategoriaListComponent]
    });
    fixture = TestBed.createComponent(MenuCategoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
