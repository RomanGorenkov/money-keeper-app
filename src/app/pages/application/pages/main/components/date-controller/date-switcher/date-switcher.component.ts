import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../services/date/date.service';
import { DateSwitcherConfig } from '../../../interfaces/date-switcher-config.interface';
import { dateSwitcherConfig } from '../../../constants/date-switcher-config';
import { DialogConfig } from '../../../../../../dialog/config/dialog-config';
import { DialogService } from '../../../../../../dialog/services/dialog/dialog.service';
import { timeIntervalConst } from '../../../constants/time-interval-const';

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

  get dateSwitchersConfig() {
    return dateSwitcherConfig[this.config.data.dateSwitcherName];
  }

  ngOnInit() {
    console.log('create');
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
