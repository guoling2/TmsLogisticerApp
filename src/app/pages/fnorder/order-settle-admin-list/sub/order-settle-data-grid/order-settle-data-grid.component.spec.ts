import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettleDataGridComponent } from './order-settle-data-grid.component';

describe('OrderSettleDataGridComponent', () => {
  let component: OrderSettleDataGridComponent;
  let fixture: ComponentFixture<OrderSettleDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSettleDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSettleDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
