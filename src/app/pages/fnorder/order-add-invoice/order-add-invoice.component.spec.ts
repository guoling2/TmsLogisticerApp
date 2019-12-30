import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddInvoiceComponent } from './order-add-invoice.component';

describe('OrderAddInvoiceComponent', () => {
  let component: OrderAddInvoiceComponent;
  let fixture: ComponentFixture<OrderAddInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
