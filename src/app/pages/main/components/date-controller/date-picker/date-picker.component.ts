import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../services/date/date.service';
import { timeIntervalConst } from '../../../constants/time-interval-const';
import { dateSwitcherConfig } from '../../../constants/date-switcher-config';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  timeInterval = timeIntervalConst.day;

  constructor(
    private dateService: DateService,
  ) {}

  ngOnInit() {
    this.subscribeOnChangeSwitcherFlag();
  }

  openDateSwitcher() {
    this.dateService.changeShowDateSwitcher();
  }

  subscribeOnChangeSwitcherFlag() {
    this.dateService.showDateSwitcherEvent.subscribe(
      () => {
      }
    );
  }

  changeDate(timeInterval: number, direction: number) {
    this.dateService.changeCurrentDateElement(dateSwitcherConfig.timeInterval[0]);
    if (direction < 0) {
      this.dateService.changeCurrentDate(this.dateService.startDate - timeInterval, this.dateService.startDate);
    } else {
      this.dateService.changeCurrentDate(this.dateService.startDate + timeInterval, this.dateService.startDate + 2 * timeInterval);
    }
  }

}
