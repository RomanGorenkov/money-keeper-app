import {EventEmitter, Injectable, Output} from '@angular/core';
import {DateSwitcherConfig} from '../../interfaces/date-switcher-config.interface';
import {timeIntervalConst} from '../../constants/time-interval-const';
import {CostService} from '../cost/cost.service';
import {UserCosts} from '../../../authorization/interfaces/user-costs.interface';

@Injectable()
export class DateService {

  showDateSwitcher = false;
  showDateSwitcherEvent = new EventEmitter<boolean>();
  currentElement: DateSwitcherConfig;

  constructor(
  ) {
  }

  get valueToDisplay() {
    if (!this.currentElement) {
      return '';
    } else {
      if (this.currentElement.valueType === 'date') {
        return this.parseNumberDate(this.currentElement.value);
      } else {
        return this.currentElement.switcherPlaceholder;
      }
    }
  }

  getTodayDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0);
  }

  getTomorrowDate() {
    return this.getTodayDate() + timeIntervalConst.day;
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

  changeCurrentDate(value: number) {
    this.currentElement.value = value;
  }
}
