import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettleAdminListComponent } from './order-settle-admin-list.component';

describe('OrderSettleAdminListComponent', () => {
  let component: OrderSettleAdminListComponent;
  let fixture: ComponentFixture<OrderSettleAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSettleAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSettleAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
