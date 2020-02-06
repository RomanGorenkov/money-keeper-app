import { Component, Input } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { CostItemConfig } from '../../../../interfaces/expense-item-config.interface';
import { addCostCategoryFormConfig } from '../../../../constants/add-cost-category-form-config';
import { ImageWithMaskComponent } from '../../../../../../../../shared/components/image-with-mask/image-with-mask.component';
import { PresetService } from '../../../../../../../../services/preset/preset.service';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { DateService } from '../../../../../../../../services/date/date.service';
import { AddCostCategoryModalWindowComponent } from './add-cost-category-modal-window.component';
import { TextInputComponent } from '../../../../../../../../shared/components/text-input/text-input.component';
import { ImageInputWithMaskComponent } from '../../../../../../../../shared/components/image-input-with-mask/image-input-with-mask.component';
import { RadioInputComponent } from '../../../../../../../../shared/components/radio-input/radio-input.component';
import { CostCategoryService } from '../../../../../../../../services/cost-category/cost-category.service';
import { ValueTypes } from '../../../../../../../../global-constants/valueTypes';

@Component({
  selector: 'app-expense-item',
  template: '<div></div>',
})
class ExpenseItemComponent {

  @Input() expenseItemConfig: CostItemConfig;
  @Input() iconId: string;

}

describe('AddCostCategoryModalWindowComponent', () => {

  let fixture;
  let component;
  let componentAny: any;

  const mockCostCategoryService = {
    addNewUserCostCategory: (data: FormData) => {
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader},
        }),
      ],
      declarations: [
        AddCostCategoryModalWindowComponent,
        TextInputComponent,
        ImageInputWithMaskComponent,
        RadioInputComponent,
        ImageWithMaskComponent,
        ExpenseItemComponent,
      ],
      providers: [
        {
          provide: DialogService,
          useValue: {},
        },
        {
          provide: PresetService,
          useValue: {},
        },
        {
          provide: CostService,
          useValue: {},
        },
        {
          provide: CostCategoryService,
          useValue: mockCostCategoryService,
        },
        {
          provide: DateService,
          useValue: {},
        },
      ],
    },)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCostCategoryModalWindowComponent);
    component = fixture.componentInstance;
    componentAny = component;
    fixture.detectChanges();
  });

  it('should create AddCostCategoryModalWindowComponent', () => {
    const createFormSpy = spyOn(component, 'createForm');

    component.ngOnInit();

    expect(component.inputs).toBe(addCostCategoryFormConfig.textInputs);
    expect(component.radioInputs).toBe(addCostCategoryFormConfig.radioInputs);
    expect(component.selectedColor).toBe(component.radioInputs[addCostCategoryFormConfig.colors.BLUE].value);
    expect(createFormSpy).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should test createForm function return correct FormGroup', () => {
    const expectValue = {
      categoryImage: '',
      name: '',
      color: addCostCategoryFormConfig.radioInputs[addCostCategoryFormConfig.colors.BLUE].value,
    };

    component.addCostCategory = null;
    component.ngOnInit();

    expect(component.addCostCategory instanceof FormGroup).toBeTrue();
    expect(component.addCostCategory.value).toEqual(expectValue);
  });

  it('should test setSelectedColor function set current selectedColor', () => {
    const testColor = 'rgba(103,102,100,0.9)';

    component.selectedColor = null;
    component.setSelectedColor(testColor);

    expect(typeof component.selectedColor === ValueTypes.STRING).toBeTrue();
    expect(component.selectedColor).toBe(testColor);
  });

  it('should test getControl function return FormControl by controlName', () => {
    const controlConfig = addCostCategoryFormConfig.textInputs[0];
    const testControl = component.getControl(controlConfig.name);

    expect(testControl instanceof FormControl).toBeTrue();
  });

});
