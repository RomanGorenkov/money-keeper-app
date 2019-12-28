import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseModalWindowComponent } from './add-expense-modal-window.component';

describe('AddExpenseModalWindowComponent', () => {
  let component: AddExpenseModalWindowComponent;
  let fixture: ComponentFixture<AddExpenseModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpenseModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
