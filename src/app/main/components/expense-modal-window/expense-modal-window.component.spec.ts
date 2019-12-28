import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseModalWindowComponent } from './expense-modal-window.component';

describe('ExpenseModalWindowComponent', () => {
  let component: ExpenseModalWindowComponent;
  let fixture: ComponentFixture<ExpenseModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
