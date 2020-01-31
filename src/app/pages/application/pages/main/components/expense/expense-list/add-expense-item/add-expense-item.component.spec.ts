import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { AddExpenseItemComponent } from './add-expense-item.component';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { ButtonsSign } from '../../../../../../../../global-constants/buttons-sign';
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config';
import { AddCostCategoryModalWindowComponent } from '../../modal-windows/add-cost-category-modal-window/add-cost-category-modal-window.component';

describe('AddExpenseItemComponent', () => {

  let component: AddExpenseItemComponent;
  let fixture: ComponentFixture<AddExpenseItemComponent>;
  let modal;
  const buttonsSign = ButtonsSign;
  const modalDialogService = {
    open: <C, D>(componentType: Type<C>, dialogConfig: DialogConfig<D>) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddExpenseItemComponent,
      ],
      providers: [
        {
          provide: DialogService,
          useValue: modalDialogService,
        },
      ],
    },)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseItemComponent);
    component = fixture.componentInstance;
    modal = fixture.debugElement.injector.get(DialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have buttonsSign as ButtonsSign`, () => {
    expect(component.buttonsSign).toEqual(buttonsSign);
  });

  it('should render buttonsSign in a button tag', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button').textContent).toContain('+');
  });

  it('should called open', () => {
    const openSpy = spyOn(modal, 'open');

    component.openModal();
    expect(openSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith(AddCostCategoryModalWindowComponent, {});
  });

});
