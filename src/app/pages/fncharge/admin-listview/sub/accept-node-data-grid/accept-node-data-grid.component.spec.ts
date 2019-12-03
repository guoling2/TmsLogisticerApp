import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptNodeDataGridComponent } from './accept-node-data-grid.component';

describe('AcceptNodeDataGridComponent', () => {
  let component: AcceptNodeDataGridComponent;
  let fixture: ComponentFixture<AcceptNodeDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptNodeDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptNodeDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
