import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaMesaListComponent } from './mesa-mesa-list.component';

describe('MesaMesaListComponent', () => {
  let component: MesaMesaListComponent;
  let fixture: ComponentFixture<MesaMesaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaMesaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaMesaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
