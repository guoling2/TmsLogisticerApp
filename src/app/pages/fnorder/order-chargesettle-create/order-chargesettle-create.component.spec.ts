import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChargesettleCreateComponent } from './order-chargesettle-create.component';

describe('OrderChargesettleCreateComponent', () => {
  let component: OrderChargesettleCreateComponent;
  let fixture: ComponentFixture<OrderChargesettleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChargesettleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChargesettleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
