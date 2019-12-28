import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTablePageComponent } from './report-table-page.component';

describe('ReportTablePageComponent', () => {
  let component: ReportTablePageComponent;
  let fixture: ComponentFixture<ReportTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
