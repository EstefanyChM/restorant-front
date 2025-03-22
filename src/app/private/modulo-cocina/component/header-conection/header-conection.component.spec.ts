import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConectionComponent } from './header-conection.component';

describe('HeaderConectionComponent', () => {
  let component: HeaderConectionComponent;
  let fixture: ComponentFixture<HeaderConectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderConectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderConectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
