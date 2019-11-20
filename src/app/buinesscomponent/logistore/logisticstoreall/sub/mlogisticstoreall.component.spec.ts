import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlogisticstoreallComponent } from './mlogisticstoreall.component';

describe('MlogisticstoreallComponent', () => {
  let component: MlogisticstoreallComponent;
  let fixture: ComponentFixture<MlogisticstoreallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlogisticstoreallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlogisticstoreallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
