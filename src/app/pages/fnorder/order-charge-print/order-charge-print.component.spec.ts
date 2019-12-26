import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChargePrintComponent } from './order-charge-print.component';

describe('OrderChargePrintComponent', () => {
  let component: OrderChargePrintComponent;
  let fixture: ComponentFixture<OrderChargePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChargePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChargePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
