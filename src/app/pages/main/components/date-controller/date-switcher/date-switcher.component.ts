import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../services/date/date.service';
import { DateSwitcherConfig } from '../../../interfaces/date-switcher-config.interface';
import { dateSwitcherConfig } from '../../../constants/date-switcher-config';
import { DialogConfig } from '../../../../dialog/config/dialog-config';
import { DialogService } from '../../../../dialog/services/dialog/dialog.service';

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
    console.log(this.dateSwitchers);
  }

  switchDate(dateSwitcher: DateSwitcherConfig) {
    this.dateService.changeCurrentDateElement(dateSwitcher);
    this.dateService.changeCurrentDate(dateSwitcher.startDate, dateSwitcher.endDate);
    this.dialog.removeDialogComponentFromBody();
  }


  setCustomDate(event, config: DateSwitcherConfig) {
    const startDate = Number(new Date(event.target.value));
    this.dateService.changeCurrentDateElement(config);
    this.dateService.changeCurrentDate(startDate, startDate + config.endDate);
    this.dialog.removeDialogComponentFromBody();
  }
}
