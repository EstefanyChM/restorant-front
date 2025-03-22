import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterConnectionComponent } from './footer-connection.component';

describe('FooterConnectionComponent', () => {
  let component: FooterConnectionComponent;
  let fixture: ComponentFixture<FooterConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterConnectionComponent]
    });
    fixture = TestBed.createComponent(FooterConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
