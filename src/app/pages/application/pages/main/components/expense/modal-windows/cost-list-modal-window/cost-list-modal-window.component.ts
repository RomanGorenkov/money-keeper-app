import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config';
import { CostDto } from '../../../../interfaces/cost-dto.intarfece';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { DateService } from '../../../../services/date/date.service';
import { PresetService } from '../../../../../../../../services/preset/preset.service';
import { makeFirstLetterCapital } from '../../../../../../../../helpers/string-helper';
import { DateFormat } from '../../../../../../../../global-constants/date-format';
import { CostListModalConfig } from '../../../../interfaces/cost-list-modal-config.interface';


@Component({
  selector: 'app-cost-list-modal-window',
  templateUrl: './cost-list-modal-window.component.html',
  styleUrls: ['./cost-list-modal-window.component.scss']
})
export class CostListModalWindowComponent implements OnInit {
  DateFormat = DateFormat;
  costList: CostDto[];
  name: string;
  private startDate: number;
  private endDate: number;

  constructor(
    public config: DialogConfig<CostListModalConfig>,
    private costService: CostService,
    private dateService: DateService,
    private presetService: PresetService,
  ) {
    this.name = config.data.name;
    this.setDateLimit();
  }

  ngOnInit() {
    this.getUserCategoryCostList();
  }

  getUserCategoryCostList() {
    this.costList = this.costService.getUserCategoryCostList(this.name, this.startDate, this.endDate);
  }

  setDateLimit() {
    this.startDate = this.dateService.currentElement.startDate;
    this.endDate = this.startDate + this.dateService.currentElement.endDate;
  }

  makeFirstLetterCapital(word: string) {
    return makeFirstLetterCapital(word);
  }
}
