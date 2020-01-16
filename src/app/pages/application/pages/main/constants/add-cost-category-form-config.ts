import { FormInput } from '../../../../authorization/interfaces/form-input.interface';
import { Validators } from '@angular/forms';
import { RadioInput } from '../../../../../shared/interfaces/radio-input.interface';

const addCostCategoryInputs: FormInput[] = [
  {
    type: 'file',
    name: 'categoryImage',
    placeholder: 'addCostCategory.imageInput',
    defaultImageUrl: '../../../../../assets/img/plus.svg',
    validators: [
      Validators.required,
    ]
  },
  {
    type: 'text',
    name: 'name',
    placeholder: 'addCostCategory.categoryName',
    validators: [
      Validators.required,
    ]
  },
];

const costCategoryColorsRadioInputs: RadioInput[] = [
  {
    label: 'addCostCategory.colors.red',
    value: 'rgba(255,0,0,0.9)',
    name: 'color',
    colorName: 'red'
  },
  {
    label: 'addCostCategory.colors.green',
    value: 'rgba(68,204,15,0.9)',
    name: 'color',
    colorName: 'green'
  },
  {
    label: 'addCostCategory.colors.blue',
    value: 'rgba(73,152,240,0.9)',
    name: 'color',
    colorName: 'blue'
  },
  {
    label: 'addCostCategory.colors.black',
    value: 'rgba(50,50,50,0.9)',
    name: 'color',
    colorName: 'black'
  },
  {
    label: 'addCostCategory.colors.peach',
    value: 'rgba(245,170,142,0.9)',
    name: 'color',
    colorName: 'peach'
  },
];

export const addCostCategoryFormConfig = {
  addCostCategoryInputs,
  costCategoryColorsRadioInputs
};

