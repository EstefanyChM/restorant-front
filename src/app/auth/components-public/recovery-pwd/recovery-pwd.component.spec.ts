import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPwdComponent } from './recovery-pwd.component';

describe('RecoveryPwdComponent', () => {
  let component: RecoveryPwdComponent;
  let fixture: ComponentFixture<RecoveryPwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoveryPwdComponent]
    });
    fixture = TestBed.createComponent(RecoveryPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
