import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDirectoryContentComponent } from './base-directory-content.component';

describe('BaseDirectoryContentComponent', () => {
  let component: BaseDirectoryContentComponent;
  let fixture: ComponentFixture<BaseDirectoryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDirectoryContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDirectoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
