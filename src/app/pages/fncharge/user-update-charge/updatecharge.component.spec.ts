import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatechargeComponent } from './updatecharge.component';

describe('UpdatechargeComponent', () => {
  let component: UpdatechargeComponent;
  let fixture: ComponentFixture<UpdatechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
