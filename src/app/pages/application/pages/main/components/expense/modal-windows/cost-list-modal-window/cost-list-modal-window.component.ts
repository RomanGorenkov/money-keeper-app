import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { CostDto } from '../../../../interfaces/cost-dto.intarfece';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { DateService } from '../../../../services/date/date.service';
import { PresetService } from '../../../../../../../../services/preset/preset.service';

@Component({
  selector: 'app-cost-list-modal-window',
  templateUrl: './cost-list-modal-window.component.html',
  styleUrls: ['./cost-list-modal-window.component.scss']
})
export class CostListModalWindowComponent implements OnInit {
  costList: CostDto[];
  title: string;
  private startDate: number;
  private endDate: number;

  constructor(
    public config: DialogConfig<any>,
    private dialog: DialogService,
    private costService: CostService,
    private dateService: DateService,
    private presetService: PresetService,
  ) {
    this.title = config.data.title;
    this.setDateLimit();
  }

  ngOnInit() {
    this.getUserCategoryCostList();
  }

  getUserCategoryCostList() {
    this.costList = this.costService.getUserCategoryCostList(this.title, this.startDate, this.endDate);
  }

  setDateLimit() {
    this.startDate = this.dateService.currentElement.startDate;
    this.endDate = this.startDate + this.dateService.currentElement.endDate;
  }
}
