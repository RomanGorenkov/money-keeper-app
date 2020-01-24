import { Component, OnInit } from '@angular/core';

import { DateSwitcherConfig } from '../../../interfaces/date-switcher-config.interface';
import { timeIntervalConst } from '../../../constants/time-interval-const';
import { dateSwitcherConfig } from '../../../constants/date-switcher/date-switcher-config';
import { DialogConfig } from '../../../../../../dialog/config/dialog-config';
import { DialogService } from '../../../../../../dialog/services/dialog/dialog.service';
import { DateService } from '../../../../../../../services/date/date.service';

@Component({
  selector: 'app-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.scss']
})
export class DateSwitcherComponent implements OnInit {

  dateSwitchers: DateSwitcherConfig[];

  constructor(
    private dateService: DateService,
    private dialog: DialogService,
    private config: DialogConfig<any>,
  ) {
  }

  get dateSwitchersConfigSwitcherNames() {
    return dateSwitcherConfig.switcherNames;
  }

  get dateSwitchersConfig() {
    return dateSwitcherConfig[this.config.data.dateSwitcherName];
  }

  ngOnInit() {
    this.createSwitcherList();
  }

  createSwitcherList() {
    this.dateSwitchers = dateSwitcherConfig[this.config.data.dateSwitcherName];
  }

  switchDate(dateSwitcher: DateSwitcherConfig) {
    this.dateService.changeCurrentDateBySwitcher(dateSwitcher);
    this.dialog.removeDialogComponentFromBody();
  }

  setCustomDate(event) {
    const startDate = Number(new Date(event.target.value).setHours(0, 0, 0, 0));
    this.dateService.changeCurrentDateByCustomDate(startDate, startDate + timeIntervalConst.day);
    this.dialog.removeDialogComponentFromBody();
  }

}
