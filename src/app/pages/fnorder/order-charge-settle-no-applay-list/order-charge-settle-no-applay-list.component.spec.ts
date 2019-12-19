import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChargeSettleNoApplayListComponent } from './order-charge-settle-no-applay-list.component';

describe('OrderChargeSettleNoApplayListComponent', () => {
  let component: OrderChargeSettleNoApplayListComponent;
  let fixture: ComponentFixture<OrderChargeSettleNoApplayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChargeSettleNoApplayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChargeSettleNoApplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
