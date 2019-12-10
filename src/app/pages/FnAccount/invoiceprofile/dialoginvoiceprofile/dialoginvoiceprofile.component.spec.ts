import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginvoiceprofileComponent } from './dialoginvoiceprofile.component';

describe('DialoginvoiceprofileComponent', () => {
  let component: DialoginvoiceprofileComponent;
  let fixture: ComponentFixture<DialoginvoiceprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoginvoiceprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginvoiceprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
