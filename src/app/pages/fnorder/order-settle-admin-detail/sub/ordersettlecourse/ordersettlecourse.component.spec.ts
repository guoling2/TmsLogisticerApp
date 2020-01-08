import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersettlecourseComponent } from './ordersettlecourse.component';

describe('OrdersettlecourseComponent', () => {
  let component: OrdersettlecourseComponent;
  let fixture: ComponentFixture<OrdersettlecourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersettlecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersettlecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
