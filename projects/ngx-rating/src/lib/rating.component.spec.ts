import { CommonModule } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';

import { NgxRatingComponent } from './rating.component';

describe('NgxRatingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [NgxRatingComponent],
    }).compileComponents();
  }));
  it('should create the component', () => {
    const fixture = TestBed.createComponent(NgxRatingComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
