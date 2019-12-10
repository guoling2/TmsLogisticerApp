import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasechargeItemComponent } from './basecharge-item.component';

describe('BasechargeItemComponent', () => {
  let component: BasechargeItemComponent;
  let fixture: ComponentFixture<BasechargeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasechargeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasechargeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
