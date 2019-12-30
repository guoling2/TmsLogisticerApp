import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QryOrderChargeComponent } from './qry-order-charge.component';

describe('QryOrderChargeComponent', () => {
  let component: QryOrderChargeComponent;
  let fixture: ComponentFixture<QryOrderChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QryOrderChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QryOrderChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
