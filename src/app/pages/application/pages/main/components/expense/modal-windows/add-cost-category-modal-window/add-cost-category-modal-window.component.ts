import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormInput } from '../../../../../../../authorization/interfaces/form-input.interface';
import { FormControls } from '../../../../../../../authorization/interfaces/form-controls.interface';
import { RadioInput } from '../../../../../../../../shared/interfaces/radio-input.interface';
import { addCostCategoryFormConfig } from '../../../../constants/add-cost-category-form-config';
import { FileExpansions } from '../../../../../../../../global-constants/file-expansions';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { InputTypes } from '../../../../../../../../global-constants/input-types';
import { CostCategoryService } from '../../../../../../../../services/cost-category/cost-category.service';

@Component({
  selector: 'app-add-cost-category-modal-window',
  templateUrl: './add-cost-category-modal-window.component.html',
  styleUrls: ['./add-cost-category-modal-window.component.scss']
})
export class AddCostCategoryModalWindowComponent implements OnInit {

  InputTypes = InputTypes;
  inputs: FormInput[];
  radioInputs: RadioInput[];
  addCostCategory: FormGroup;
  selectedColor: string;
  FileExpansions = FileExpansions;

  constructor(
    private costCategoryService: CostCategoryService,
    private dialog: DialogService,
  ) {
  }

  ngOnInit() {
    this.inputs = addCostCategoryFormConfig.textInputs;
    this.radioInputs = addCostCategoryFormConfig.radioInputs;
    this.selectedColor = this.radioInputs[addCostCategoryFormConfig.colors.BLUE].value;
    this.createForm();
  }

  private createForm() {
    const controls: FormControls = this.inputs.reduce((config, controlConfig) => {
      config[controlConfig.name] = new FormControl('', controlConfig.validators);
      return config;
    }, {});

    controls[addCostCategoryFormConfig.names.COLOR] = new FormControl(this.selectedColor, Validators.required);
    this.addCostCategory = new FormGroup(controls);
  }

  setSelectedColor(color: string) {
    this.selectedColor = color;
  }

  getControl(controlName: string): FormControl {
    return this.addCostCategory.get(controlName) as FormControl;
  }

  addNewCostCategory(event) {
    console.log(JSON.stringify(event.target));
    const data = new FormData(event.target);

    data.append(addCostCategoryFormConfig.names.COLOR, this.selectedColor);
    this.costCategoryService.addNewUserCostCategory(data)
      .subscribe(
        (imageUrl) => {
          this.costCategoryService.addNewCostCategoryInCurrentCategoryList(imageUrl, this.addCostCategory.value);
          this.dialog.removeDialogComponentFromBody();
        }
      );
  }

}
