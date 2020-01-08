import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../services/date/date.service';
import { timeIntervalConst } from '../../../constants/time-interval-const';
import { dateSwitcherConfig } from '../../../constants/date-switcher-config';
import { DialogService } from '../../../../dialog/services/dialog/dialog.service';
import { DateSwitcherComponent } from '../date-switcher/date-switcher.component';
import { dialogOverlayColor } from '../../../../dialog/constants/dialog-overlay-colors';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  timeInterval = timeIntervalConst.day;

  constructor(
    private dateService: DateService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.dateService.changeCurrentDateElement(dateSwitcherConfig.timeInterval[1]);

  }

  openDateSwitcher() {
    this.dialogService.open(DateSwitcherComponent, {data: {dateSwitcherName: 'timeInterval'}}, dialogOverlayColor.clear);
  }


  changeDate(timeInterval: number, direction: number) {
    if (direction < 0) {
      this.dateService.changeCurrentDateByCustomDate(this.dateService.startDate - timeInterval, this.dateService.startDate);
    } else {
      this.dateService.changeCurrentDateByCustomDate(
        this.dateService.startDate + timeInterval, this.dateService.startDate + 2 * timeInterval
      );
    }
  }

}
