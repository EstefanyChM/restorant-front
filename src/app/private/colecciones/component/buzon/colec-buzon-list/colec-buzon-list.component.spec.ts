import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColecBuzonListComponent } from './colec-buzon-list.component';

describe('ColecBuzonListComponent', () => {
  let component: ColecBuzonListComponent;
  let fixture: ComponentFixture<ColecBuzonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColecBuzonListComponent]
    });
    fixture = TestBed.createComponent(ColecBuzonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
