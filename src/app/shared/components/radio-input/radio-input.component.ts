import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RadioInput } from '../../interfaces/radio-input.interface';
import { cssColors } from '../../../global-constants/css-colors';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss']
})
export class RadioInputComponent {

  @Input() isSelected: boolean;
  @Input() control: FormControl;
  @Input() inputData: RadioInput;
  @Output() valueSelected = new EventEmitter<string>();

  cssColors = cssColors;

  selectValue(value: string) {
    this.valueSelected.emit(value);
  }

}
