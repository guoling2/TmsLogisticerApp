import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderExcelAnalysisComponent } from './order-excel-analysis.component';

describe('OrderExcelAnalysisComponent', () => {
  let component: OrderExcelAnalysisComponent;
  let fixture: ComponentFixture<OrderExcelAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderExcelAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderExcelAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
