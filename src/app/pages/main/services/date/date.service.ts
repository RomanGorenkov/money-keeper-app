import { EventEmitter, Injectable } from '@angular/core';
import { DateSwitcherConfig } from '../../interfaces/date-switcher-config.interface';
import { timeIntervalConst } from '../../constants/time-interval-const';
import { CostService } from '../cost/cost.service';

@Injectable()
export class DateService {

  showDateSwitcher = false;
  showDateSwitcherEvent = new EventEmitter<boolean>();
  currentElement: DateSwitcherConfig;

  constructor(
    private costService: CostService,
  ) {
  }

  get valueToDisplay() {
    if (!this.currentElement) {
      return '';
    } else {
      if (this.currentElement.valueType === 'date') {
        return this.parseNumberDate(this.currentElement.startDate);
      } else {
        return this.currentElement.switcherPlaceholder;
      }
    }
  }

  get startDate() {
    return this.currentElement.startDate;
  }

  get endDate() {
    return this.currentElement.endDate;
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

  changeCurrentDate(value: number, endDate: number) {
    this.currentElement.startDate = value;
    this.currentElement.endDate = endDate;
    this.costService.getAllUserCosts(this.startDate, this.endDate);
  }

  changeCurrentDateElement(config: DateSwitcherConfig) {
    const currentDate = this.currentElement.startDate;
    this.currentElement = config;
    this.currentElement.startDate = currentDate;
  }
}
