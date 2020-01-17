import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormInput } from '../../../../../../../authorization/interfaces/form-input.interface';
import { FormControls } from '../../../../../../../authorization/interfaces/form-controls.interface';
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { CostDto } from '../../../../interfaces/cost-dto.intarfece';
import { addExpenseInputs } from '../../../../constants/add-cost-form-config';
import { AddCostModalConfig } from '../../../../interfaces/add-cost-modal-config.interface';

@Component({
  selector: 'app-add-expense-modal-window',
  templateUrl: './add-expense-modal-window.component.html',
  styleUrls: ['./add-expense-modal-window.component.scss']
})
export class AddExpenseModalWindowComponent implements OnInit {

  inputs: FormInput[];
  addExpenseForm: FormGroup;

  constructor(
    private dialog: DialogService,
    public config: DialogConfig<AddCostModalConfig>,
    private costService: CostService,
  ) {
  }

  ngOnInit() {
    this.inputs = addExpenseInputs;
    this.createForm();
  }

  private createForm() {
    const controls: FormControls = this.inputs.reduce((config, controlConfig) => {
      config[controlConfig.name] = new FormControl('', controlConfig.validators);
      return config;
    }, {});

    this.addExpenseForm = new FormGroup(controls);
  }

  getControl(controlName: string): FormControl {
    return this.addExpenseForm.get(controlName) as FormControl;
  }

  addCost() {
    const newCost = this.createNewCost();
    this.costService.addCost(newCost).subscribe(
      () => {
        this.dialog.removeDialogComponentFromBody();
      },
      error => {
        console.log(error);
      }
    );
  }

  createNewCost(): CostDto {
    return {
      costDate: Date.now(),
      costType: this.config.data.name,
      costDescription: this.addExpenseForm.value.description,
      costValue: parseInt(this.addExpenseForm.value.expense, 10),
      costLocalizationKey: this.config.data.title,
    };
  }

}