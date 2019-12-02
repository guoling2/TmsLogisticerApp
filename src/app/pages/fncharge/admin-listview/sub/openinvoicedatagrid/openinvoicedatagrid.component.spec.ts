import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeninvoicedatagridComponent } from './openinvoicedatagrid.component';

describe('OpeninvoicedatagridComponent', () => {
  let component: OpeninvoicedatagridComponent;
  let fixture: ComponentFixture<OpeninvoicedatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeninvoicedatagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeninvoicedatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
