import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QryDailyChargeComponent } from './qry-daily-charge.component';

describe('QryDailyChargeComponent', () => {
  let component: QryDailyChargeComponent;
  let fixture: ComponentFixture<QryDailyChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QryDailyChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QryDailyChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
