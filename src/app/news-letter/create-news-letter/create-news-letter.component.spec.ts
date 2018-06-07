import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsLetterComponent } from './create-news-letter.component';

describe('CreateNewsLetterComponent', () => {
  let component: CreateNewsLetterComponent;
  let fixture: ComponentFixture<CreateNewsLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewsLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewsLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
