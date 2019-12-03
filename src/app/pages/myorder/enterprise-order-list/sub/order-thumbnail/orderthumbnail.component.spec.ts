import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderthumbnailComponent } from './orderthumbnail.component';

describe('OrderthumbnailComponent', () => {
  let component: OrderthumbnailComponent;
  let fixture: ComponentFixture<OrderthumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderthumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderthumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
