import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderForceBlanceComponent } from './order-force-blance.component';

describe('OrderForceBlanceComponent', () => {
  let component: OrderForceBlanceComponent;
  let fixture: ComponentFixture<OrderForceBlanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderForceBlanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderForceBlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
