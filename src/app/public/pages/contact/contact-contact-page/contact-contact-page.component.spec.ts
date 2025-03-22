import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContactPageComponent } from './contact-contact-page.component';

describe('ContactContactPageComponent', () => {
  let component: ContactContactPageComponent;
  let fixture: ComponentFixture<ContactContactPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactContactPageComponent]
    });
    fixture = TestBed.createComponent(ContactContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
