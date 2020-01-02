import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../../services/date/date.service';
import { DateSwitcherConfig } from '../../../interfaces/date-switcher-config.interface';
import { dateSwitcherConfig } from '../../../constants/date-switcher-config';

@Component({
  selector: 'app-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.scss']
})
export class DateSwitcherComponent implements OnInit {

  @Input() dateSwitcherName: string;

  private showSwitcherFlag = false;
  private dateSwitchers: DateSwitcherConfig[];


  constructor(
    private dateService: DateService,
  ) {

  }

  ngOnInit() {
    this.subscribeOnChangeSwitcherFlag();
    this.createSwitcherList();
    this.dateService.currentElement = this.dateSwitchers[1];
  }

  subscribeOnChangeSwitcherFlag() {
    this.dateService.showDateSwitcherEvent.subscribe(
      switcherFlag => {
        this.showSwitcherFlag = switcherFlag;
      }
    );
  }

  createSwitcherList() {
    this.dateSwitchers = dateSwitcherConfig[this.dateSwitcherName];
  }

  switchDate(dateSwitcher: DateSwitcherConfig) {
    this.dateService.currentElement = dateSwitcher;
    this.dateService.changeShowDateSwitcher();
  }


  setCustomDate(event, config: DateSwitcherConfig) {
    config.startDate = Number(new Date(event.target.value));
    console.log(config.startDate);
    this.dateService.currentElement = config;
    this.dateService.changeShowDateSwitcher();
  }
}
