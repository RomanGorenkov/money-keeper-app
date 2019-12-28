import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from '../../../../../dialog/services/dialog/dialog.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormInput} from '../../../../../authorization/interfaces/form-input.interface';
import {FormControls} from '../../../../../authorization/interfaces/form-controls.interface';
import {formConfigs} from '../../../../../authorization/constants/form-configs';
import {DialogConfig} from '../../../../../dialog/config/dialog-config';

@Component({
  selector: 'app-add-expense-modal-window',
  templateUrl: './add-expense-modal-window.component.html',
  styleUrls: ['./add-expense-modal-window.component.scss']
})
export class AddExpenseModalWindowComponent implements OnInit {

  @Input() formTitle: string;
  inputs: FormInput[];
  addExpenseForm: FormGroup;

  constructor(
    private dialog: DialogService,
    public config: DialogConfig,
  ) { }

  formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
      ]),
    description: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
  );

  ngOnInit() {
    this.inputs = formConfigs.addExpenseForm.formInputs;
    this.createForm('addExpenseForm');
  }

  onClose() {
    this.dialog.removeDialogComponentFromBody();
  }

  private createForm(type: string) {
    const controls: FormControls = this.inputs.reduce((config, controlConfig) => {
      config[controlConfig.name] = new FormControl('', controlConfig.validators);
      return config;
    }, {});

    this.addExpenseForm = new FormGroup(controls, {
      validators: formConfigs[type].externalValidators
    });
  }

  getControl(controlName: string): FormControl {
    return this.addExpenseForm.get(controlName) as FormControl;
  }

}
