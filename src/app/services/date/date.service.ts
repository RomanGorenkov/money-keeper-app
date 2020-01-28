import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { DateSwitcherConfig } from '../../pages/application/pages/main/interfaces/date-switcher-config.interface';
import { dateSwitcherConfig } from '../../pages/application/pages/main/constants/date-switcher/date-switcher-config';
import { CostService } from '../cost/cost.service';
import { Direction } from '../../global-constants/direction';
import { SwitcherValueType } from '../../pages/application/pages/main/constants/date-switcher/switcher-value-type';
import { DateFormat } from '../../global-constants/date-format';

@Injectable()
export class DateService {

  Direction = Direction;
  currentElement: DateSwitcherConfig;
  currentDate: number;

  constructor(
    private costService: CostService,
    private datePipe: DatePipe,
  ) {
    this.currentElement = dateSwitcherConfig.timeInterval[dateSwitcherConfig.indexOfTodaySwitcher];
  }

  get valueToDisplay() {
    if (!this.currentElement) {
      return '';
    } else {
      if (this.currentElement.valueType === SwitcherValueType.DATE) {
        return this.datePipe.transform(this.currentElement.startDate, DateFormat.UIS);
      } else {
        return this.currentElement.switcherPlaceholder;
      }
    }
  }

  getStartDate() {
    return this.currentElement.startDate;
  }

  getEndDate() {
    return this.currentElement.endDate;
  }

  changeCurrentDateByCustomDate(startDate: number, endDate: number) {
    this.changeCurrentDateElement(dateSwitcherConfig.timeInterval[dateSwitcherConfig.indexOfCustomSwitcher]);
    this.checkCurrentDateOnToday(startDate, endDate);
  }

  changeCurrentDateBySwitcher(dateSwitcher: DateSwitcherConfig) {
    this.changeCurrentDateElement(dateSwitcher);
    this.costService.changeCostList(this.getStartDate(), this.getEndDate());
  }


  private changeCurrentDate(startDate: number, endDate: number) {
    this.currentElement.startDate = startDate;
    this.currentElement.endDate = endDate;
    this.costService.changeCostList(this.getStartDate(), this.getEndDate());
  }

  private changeCurrentDateElement(config: DateSwitcherConfig) {
    this.currentDate = this.currentElement.startDate;
    this.currentElement = config;
  }

  private checkCurrentDateOnToday(startDate: number, endDate: number) {
    if (startDate === dateSwitcherConfig.timeInterval[dateSwitcherConfig.indexOfTodaySwitcher].startDate) {
      this.changeCurrentDateBySwitcher(dateSwitcherConfig.timeInterval[dateSwitcherConfig.indexOfTodaySwitcher]);
    } else {
      this.changeCurrentDate(startDate, endDate);
    }
  }

}
