import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseOrdersComponent } from './enterprise-orders.component';

describe('EnterpriseOrdersComponent', () => {
  let component: EnterpriseOrdersComponent;
  let fixture: ComponentFixture<EnterpriseOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
