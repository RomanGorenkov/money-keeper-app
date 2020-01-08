import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from '../../../../../dialog/services/dialog/dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormInput } from '../../../../../authorization/interfaces/form-input.interface';
import { FormControls } from '../../../../../authorization/interfaces/form-controls.interface';
import { formConfigs } from '../../../../../authorization/constants/form-configs';
import { DialogConfig } from '../../../../../dialog/config/dialog-config';
import { CostService } from '../../../../../../services/cost/cost.service';
import { CostDto } from '../../../../interfaces/cost-dto.intarfece';
import { addExpenseInputs } from '../../../../constants/add-cost-form-config';
import { UserCosts } from '../../../../../authorization/interfaces/user-costs.interface';
import { timeIntervalConst } from '../../../../constants/time-interval-const';

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
    public config: DialogConfig<any>,
    private costService: CostService,
  ) {}

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
    const newCost: CostDto = {
      costDate: Date.now(),
      costType: this.config.data.title,
      costDescription: this.addExpenseForm.value.description,
      costValue: parseInt(this.addExpenseForm.value.expense, 10)
    };
    this.costService.addCost(newCost).subscribe(
      () => {
        this.dialog.removeDialogComponentFromBody();
      },
      error => {
        console.log(error);
      }
    );
  }

}
