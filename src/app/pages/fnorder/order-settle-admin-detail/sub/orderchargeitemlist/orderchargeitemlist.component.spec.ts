import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderchargeitemlistComponent } from './orderchargeitemlist.component';

describe('OrderchargeitemlistComponent', () => {
  let component: OrderchargeitemlistComponent;
  let fixture: ComponentFixture<OrderchargeitemlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderchargeitemlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderchargeitemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
