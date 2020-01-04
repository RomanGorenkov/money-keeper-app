import { EventEmitter, Injectable } from '@angular/core';
import { DateSwitcherConfig } from '../../interfaces/date-switcher-config.interface';
import { timeIntervalConst } from '../../constants/time-interval-const';
import { CostService } from '../../../../services/cost/cost.service';
import { timeInterval } from 'rxjs/operators';
import { dateSwitcherConfig } from '../../constants/date-switcher-config';

@Injectable()
export class DateService {

  showDateSwitcher = true;
  showDateSwitcherEvent = new EventEmitter<boolean>();
  currentElement: DateSwitcherConfig;
  currentDate: number;

  constructor(
    private costService: CostService,
  ) {
    this.currentElement = dateSwitcherConfig.timeInterval[1];
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

  parseNumberDate(numberDate: number) {
    const date = new Date(numberDate);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return day + '/' + (monthIndex + 1 < 10 ? '0' + (monthIndex + 1) : monthIndex + 1) + '/' + year;
  }

  changeCurrentDate(startDate: number, endDate: number) {
    this.currentElement.startDate = startDate;
    this.currentElement.endDate = endDate;
    this.costService.setCurrentCostList(this.startDate, this.endDate);
  }

  changeCurrentDateElement(config: DateSwitcherConfig) {
    this.currentDate = this.currentElement.startDate;
    this.currentElement = config;
  }

  changeCurrentDateInterval(config: DateSwitcherConfig) {
    this.currentElement.startDate = this.currentDate;
  }
}
