import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettleAdminProcessComponent } from './order-settle-admin-process.component';

describe('OrderSettleAdminProcessComponent', () => {
  let component: OrderSettleAdminProcessComponent;
  let fixture: ComponentFixture<OrderSettleAdminProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSettleAdminProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSettleAdminProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
