import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGraphsPageComponent } from './report-graphs-page.component';

describe('ReportGraphsPageComponent', () => {
  let component: ReportGraphsPageComponent;
  let fixture: ComponentFixture<ReportGraphsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGraphsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGraphsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
