import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNavComponent } from './template-nav.component';

describe('TemplateNavComponent', () => {
  let component: TemplateNavComponent;
  let fixture: ComponentFixture<TemplateNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateNavComponent]
    });
    fixture = TestBed.createComponent(TemplateNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
