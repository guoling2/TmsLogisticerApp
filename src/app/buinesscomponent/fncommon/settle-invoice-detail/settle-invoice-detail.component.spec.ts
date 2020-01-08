import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleInvoiceDetailComponent } from './settle-invoice-detail.component';

describe('SettleInvoiceDetailComponent', () => {
  let component: SettleInvoiceDetailComponent;
  let fixture: ComponentFixture<SettleInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettleInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
