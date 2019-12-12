import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelSendComponent } from './order-cancel-send.component';

describe('OrderCancelSendComponent', () => {
  let component: OrderCancelSendComponent;
  let fixture: ComponentFixture<OrderCancelSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancelSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
