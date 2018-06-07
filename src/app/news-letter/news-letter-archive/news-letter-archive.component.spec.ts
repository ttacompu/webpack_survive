import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLetterArchiveComponent } from './news-letter-archive.component';

describe('NewsLetterArchiveComponent', () => {
  let component: NewsLetterArchiveComponent;
  let fixture: ComponentFixture<NewsLetterArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLetterArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLetterArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
