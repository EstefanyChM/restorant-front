import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHomePageComponent } from './home.component';

describe('HomeHomePageComponent', () => {
  let component: HomeHomePageComponent;
  let fixture: ComponentFixture<HomeHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeHomePageComponent]
    });
    fixture = TestBed.createComponent(HomeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
