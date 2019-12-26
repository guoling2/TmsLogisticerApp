import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettleAdminDetailComponent } from './order-settle-admin-detail.component';

describe('OrderSettleAdminDetailComponent', () => {
  let component: OrderSettleAdminDetailComponent;
  let fixture: ComponentFixture<OrderSettleAdminDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSettleAdminDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSettleAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
