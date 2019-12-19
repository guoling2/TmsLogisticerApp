import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChargeSettleDetailComponent } from './order-charge-settle-detail.component';

describe('OrderChargeSettleDetailComponent', () => {
  let component: OrderChargeSettleDetailComponent;
  let fixture: ComponentFixture<OrderChargeSettleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChargeSettleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChargeSettleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
