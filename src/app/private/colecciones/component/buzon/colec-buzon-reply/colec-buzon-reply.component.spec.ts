import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColecBuzonReplyComponent } from './colec-buzon-reply.component';

describe('ColecBuzonReplyComponent', () => {
  let component: ColecBuzonReplyComponent;
  let fixture: ComponentFixture<ColecBuzonReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColecBuzonReplyComponent]
    });
    fixture = TestBed.createComponent(ColecBuzonReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
