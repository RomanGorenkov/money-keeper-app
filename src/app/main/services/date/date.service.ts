import {EventEmitter, Injectable, Output} from '@angular/core';
import {DateSwitcherConfig} from '../../interfaces/date-switcher-config.interface';

@Injectable()
export class DateService {

  showDateSwitcher = false;
  showDateSwitcherEvent = new EventEmitter<boolean>();
  currentElement: DateSwitcherConfig;

  constructor() {
  }

  get valueToDisplay() {
    if (!this.currentElement) {
      return '';
    }
    if (this.currentElement.valueType === 'date') {
      return this.parseNumberDate(this.currentElement.value);
    } else {
      return this.currentElement.switcherPlaceholder;
    }
  }


  changeShowDateSwitcher() {
    this.showDateSwitcherEvent.emit(!this.showDateSwitcher);
    this.showDateSwitcher = !this.showDateSwitcher;
  }

  parseNumberDate(numberDate: number) {
    const date = new Date(numberDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return day + '/' + (monthIndex + 1) + '/' + year;
  }
}
