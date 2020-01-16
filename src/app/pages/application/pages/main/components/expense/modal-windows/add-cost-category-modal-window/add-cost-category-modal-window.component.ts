import { Component, OnInit } from '@angular/core';
import { FormInput } from '../../../../../../../authorization/interfaces/form-input.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControls } from '../../../../../../../authorization/interfaces/form-controls.interface';
import { addCostCategoryFormConfig } from '../../../../constants/add-cost-category-form-config';
import { RadioInput } from '../../../../../../../../shared/interfaces/radio-input.interface';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { ExpenseItemConfig } from '../../../../interfaces/expense-item-config.interface';
import { InputTypes } from '../../../../../../../../global-constants/input-types';

@Component({
  selector: 'app-add-cost-category-modal-window',
  templateUrl: './add-cost-category-modal-window.component.html',
  styleUrls: ['./add-cost-category-modal-window.component.scss']
})
export class AddCostCategoryModalWindowComponent implements OnInit {

  InputTypes = InputTypes;
  inputs: FormInput[];
  colors: RadioInput[];
  addCostCategory: FormGroup;
  selectedColor: string;

  constructor(
    private costService: CostService,
    private dialog: DialogService,
  ) {
  }

  ngOnInit() {
    this.inputs = addCostCategoryFormConfig.addCostCategoryInputs;
    this.colors = addCostCategoryFormConfig.costCategoryColorsRadioInputs;
    this.createForm();
  }

  private createForm() {
    const controls: FormControls = this.inputs.reduce((config, controlConfig) => {
      config[controlConfig.name] = new FormControl('', controlConfig.validators);
      return config;
    }, {});
    controls[this.colors[0].name] = new FormControl('', Validators.required);
    this.addCostCategory = new FormGroup(controls);
  }

  getSelectedColor(color: string) {
    this.selectedColor = color;
  }

  getControl(controlName: string): FormControl {
    return this.addCostCategory.get(controlName) as FormControl;
  }

  addNewCostCategory(event) {
    const data = new FormData(event.target);
    data.append('color', this.selectedColor);
    this.costService.addNewUserCostCategory(data).subscribe(
      (imageUrl) => {
        this.addNewCostCategoryInCurrentCategoryList(imageUrl as string);
      }
    );
  }

  addNewCostCategoryInCurrentCategoryList(categoryImageUrl: string) {
    const newCategory = this.addCostCategory.value as ExpenseItemConfig;
    newCategory.imageUrl = categoryImageUrl;
    newCategory.name = newCategory.name.toLowerCase();
    this.costService.addNewUserCostCategoryInCurrentCategoryList(newCategory);
    this.dialog.removeDialogComponentFromBody();
  }

}
