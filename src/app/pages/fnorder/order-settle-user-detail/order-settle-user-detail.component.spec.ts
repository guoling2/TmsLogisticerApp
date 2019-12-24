import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettleUserDetailComponent } from './order-settle-user-detail.component';

describe('OrderSettleUserDetailComponent', () => {
  let component: OrderSettleUserDetailComponent;
  let fixture: ComponentFixture<OrderSettleUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSettleUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSettleUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
