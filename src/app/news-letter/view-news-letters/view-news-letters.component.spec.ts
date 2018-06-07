import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewsLettersComponent } from './view-news-letters.component';

describe('ViewNewsLettersComponent', () => {
  let component: ViewNewsLettersComponent;
  let fixture: ComponentFixture<ViewNewsLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewsLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewsLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
