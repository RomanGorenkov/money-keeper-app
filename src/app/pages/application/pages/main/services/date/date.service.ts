import { Injectable } from '@angular/core';
import { DateSwitcherConfig } from '../../interfaces/date-switcher-config.interface';
import { CostService } from '../../../../../../services/cost/cost.service';
import { dateSwitcherConfig } from '../../constants/date-switcher/date-switcher-config';
import { Direction } from './enums/date-direction';

@Injectable()
export class DateService {


  Direction = Direction;
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

  changeCurrentDateByCustomDate(startDate: number, endDate: number) {
    this.changeCurrentDateElement(dateSwitcherConfig.timeInterval[0]);
    this.checkCurrentDateOnToday(startDate, endDate);
  }

  changeCurrentDateBySwitcher(dateSwitcher: DateSwitcherConfig) {
    this.changeCurrentDateElement(dateSwitcher);
    this.costService.updateCurrentCostList(this.startDate, this.endDate);
  }


  changeCurrentDate(startDate: number, endDate: number) {
    this.currentElement.startDate = startDate;
    this.currentElement.endDate = endDate;
    this.costService.updateCurrentCostList(this.startDate, this.endDate);
  }

  changeCurrentDateElement(config: DateSwitcherConfig) {
    this.currentDate = this.currentElement.startDate;
    this.currentElement = config;
  }

  checkCurrentDateOnToday(startDate: number, endDate: number) {
    if (startDate === dateSwitcherConfig.timeInterval[1].startDate) {
      this.changeCurrentDateBySwitcher(dateSwitcherConfig.timeInterval[1]);
    } else {
      this.changeCurrentDate(startDate, endDate);
    }
  }
}
