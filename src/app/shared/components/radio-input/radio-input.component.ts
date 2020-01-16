import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RadioInput } from '../../interfaces/radio-input.interface';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss']
})
export class RadioInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() inputData: RadioInput;
  @Output() valueSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  selectValue(value: string) {
    this.valueSelected.emit(value);
  }

}
