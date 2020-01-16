import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSpanComponent } from './information-span.component';

describe('InformationSpanComponent', () => {
  let component: InformationSpanComponent;
  let fixture: ComponentFixture<InformationSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
