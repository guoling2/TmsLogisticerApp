import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpdateReceiveAmtComponent } from './order-update-receive-amt.component';

describe('OrderUpdateReceiveAmtComponent', () => {
  let component: OrderUpdateReceiveAmtComponent;
  let fixture: ComponentFixture<OrderUpdateReceiveAmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUpdateReceiveAmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUpdateReceiveAmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
