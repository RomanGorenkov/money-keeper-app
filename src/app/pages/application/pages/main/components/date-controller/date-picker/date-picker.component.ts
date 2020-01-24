import { Component } from '@angular/core';

import { timeIntervalConst } from '../../../constants/time-interval-const';
import { dialogOverlayColor } from '../../../../../../dialog/constants/dialog-overlay-colors';
import { DateService } from '../../../../../../../services/date/date.service';
import { DialogService } from '../../../../../../dialog/services/dialog/dialog.service';
import { DateSwitcherComponent } from '../date-switcher/date-switcher.component';
import { ButtonsSign } from '../../../../../../../global-constants/buttonsSign';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  timeInterval = timeIntervalConst.day;
  ButtonsSign = ButtonsSign;

  constructor(
    private dateService: DateService,
    private dialogService: DialogService,
  ) {
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
