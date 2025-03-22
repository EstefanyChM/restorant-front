import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAboutPageComponent } from './about-about-page.component';

describe('AboutAboutPageComponent', () => {
  let component: AboutAboutPageComponent;
  let fixture: ComponentFixture<AboutAboutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutAboutPageComponent]
    });
    fixture = TestBed.createComponent(AboutAboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
