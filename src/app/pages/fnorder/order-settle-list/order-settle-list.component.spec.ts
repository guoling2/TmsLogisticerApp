import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettleListComponent } from './order-settle-list.component';

describe('OrderSettleListComponent', () => {
  let component: OrderSettleListComponent;
  let fixture: ComponentFixture<OrderSettleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSettleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSettleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
