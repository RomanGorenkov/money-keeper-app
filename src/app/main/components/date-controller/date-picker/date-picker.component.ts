import {Component, OnInit} from '@angular/core';
import {DateService} from '../../../services/date/date.service';
import {timeIntervalConst} from '../../../constants/time-interval-const';
import {dateSwitcherConfig} from '../../../constants/date-switcher-config';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  date: any;
  timeInterval = timeIntervalConst.day;

  constructor(
    private dateService: DateService,
  ) {
    this.date = Date.now();
  }

  ngOnInit() {
    this.subscribeOnChangeSwitcherFlag();
  }

  openDateSwitcher() {
    this.dateService.changeShowDateSwitcher();
  }

  subscribeOnChangeSwitcherFlag() {
    this.dateService.showDateSwitcherEvent.subscribe(
      () => {
        this.date = this.dateService.valueToDisplay;
      }
    );
  }

  changeDate(timeInterval: number, direction: number) {
    const currentDate = this.dateService.currentElement.value;
    this.dateService.currentElement = dateSwitcherConfig.timeInterval[0];
    this.dateService.currentElement.value = currentDate;
    if ( direction < 0) {
      this.dateService.currentElement.value -= timeInterval;
    } else {
      this.dateService.currentElement.value += timeInterval;
    }
  }

}
