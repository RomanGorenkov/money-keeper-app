import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostListModalWindowComponent } from './cost-list-modal-window.component';

describe('CostListModalWindowComponent', () => {
  let component: CostListModalWindowComponent;
  let fixture: ComponentFixture<CostListModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostListModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostListModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
