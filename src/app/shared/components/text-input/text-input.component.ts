import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

import { errorListHandlers } from '../../../helpers/error-helper';
import { FormInput } from '../../../pages/authorization/interfaces/form-input.interface';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() value: string;
  @Input() inputData: FormInput;
  @Input() control: FormControl;

  get errorMassage() {
    return this.control.errors && this.checkErrorKeys(this.control.errors);
  }

  ngOnInit() {
    this.control.setValue(this.value);
  }

  checkErrorKeys(error: ValidationErrors) {
    const key = Object.keys(error).find(k => k in errorListHandlers);

    return errorListHandlers[key](error);
  }

}
