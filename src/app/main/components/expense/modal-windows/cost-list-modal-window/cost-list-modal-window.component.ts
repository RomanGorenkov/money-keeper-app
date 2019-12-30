import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '../../../../../dialog/config/dialog-config';
import {DialogService} from '../../../../../dialog/services/dialog/dialog.service';
import {CostDto} from '../../../../interfaces/cost-dto.intarfece';
import {CostService} from '../../../../services/cost/cost.service';
import {DateService} from '../../../../services/date/date.service';

@Component({
  selector: 'app-cost-list-modal-window',
  templateUrl: './cost-list-modal-window.component.html',
  styleUrls: ['./cost-list-modal-window.component.scss']
})
export class CostListModalWindowComponent implements OnInit {

  private title: string;
  private costList: CostDto[];
  private startDate: number;
  private endDate: number;

  constructor(
    public config: DialogConfig,
    private dialog: DialogService,
    private costService: CostService,
    private dateService: DateService,
  ) {
    this.title = config.data.title;
    this.setDateLimit();
  }

  ngOnInit() {
    this.getUserCategoryCostList();
  }

  getUserCategoryCostList() {
    this.costService.getUserCategoryCostList(this.title, this.startDate, this.endDate).subscribe(
      answer => {
        this.costList = answer as CostDto[];
      },
      error => {
        console.log(error);
      }
    );
  }

  setDateLimit() {
    this.startDate = this.dateService.currentElement.value;
    this.endDate = this.startDate + this.dateService.currentElement.timeInterval;
  }

}
