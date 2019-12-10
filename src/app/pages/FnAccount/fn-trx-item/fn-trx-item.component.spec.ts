import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FnTrxItemComponent } from './fn-trx-item.component';

describe('FnTrxItemComponent', () => {
  let component: FnTrxItemComponent;
  let fixture: ComponentFixture<FnTrxItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FnTrxItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FnTrxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
