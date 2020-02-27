import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Type } from '@angular/core'

import { AddCostItemComponent } from './add-cost-item.component'
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service'
import { ButtonsSign } from '../../../../../../../../global-constants/buttons-sign'
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config'
import { AddCostCategoryModalWindowComponent } from '../../modal-windows/add-cost-category-modal-window/add-cost-category-modal-window.component'

describe('AddExpenseItemComponent', () => {
  let component: AddCostItemComponent
  let fixture: ComponentFixture<AddCostItemComponent>
  let dialogService: DialogService

  const buttonsSign = ButtonsSign
  const modalDialogService = {
    open: <C, D>(componentType: Type<C>, dialogConfig: DialogConfig<D>) => {},
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCostItemComponent],
      providers: [
        {
          provide: DialogService,
          useValue: modalDialogService,
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCostItemComponent)
    component = fixture.componentInstance
    dialogService = fixture.debugElement.injector.get(DialogService)
    fixture.detectChanges()
  })

  it('should create AddCostItemComponent', () => {
    expect(component).toBeTruthy()
  })

  it(`should have buttonsSign as ButtonsSign`, () => {
    expect(component.buttonsSign).toEqual(buttonsSign)
  })

  it('should render buttonsSign in a button tag', () => {
    const compiled = fixture.debugElement.nativeElement

    expect(compiled.querySelector('button').textContent).toContain('+')
  })

  it('should test openModal function called open function', () => {
    const openSpy = spyOn(dialogService, 'open')

    component.openModal()

    expect(openSpy).toHaveBeenCalledWith(AddCostCategoryModalWindowComponent, {})
  })
})
