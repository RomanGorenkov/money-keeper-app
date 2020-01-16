import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCostCategoryModalWindowComponent } from './add-cost-category-modal-window.component';

describe('AddCostCategoryModalWindowComponent', () => {
  let component: AddCostCategoryModalWindowComponent;
  let fixture: ComponentFixture<AddCostCategoryModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCostCategoryModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCostCategoryModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
