import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColecBuzonMultipleComponent } from './colec-buzon-multiple.component';

describe('ColecBuzonMultipleComponent', () => {
  let component: ColecBuzonMultipleComponent;
  let fixture: ComponentFixture<ColecBuzonMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColecBuzonMultipleComponent]
    });
    fixture = TestBed.createComponent(ColecBuzonMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
