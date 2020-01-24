import { Component } from '@angular/core';

import { CostDto } from '../../interfaces/cost-dto.intarfece';
import { CostService } from '../../../../../../services/cost/cost.service';
import { PresetService } from '../../../../../../services/preset/preset.service';
import { makeFirstLetterCapital } from '../../../../../../helpers/string-helper';
import { DateFormat } from '../../../../../../global-constants/date-format';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent {

  DateFormat = DateFormat;

  constructor(
    public costService: CostService,
    private presetService: PresetService,
  ) {
  }

  get costList(): CostDto[] {
    const costList: CostDto[] = [];
    this.costService.currentCostList.getValue().map(costCategory => {
      costCategory.costList.map(cost => {
        const costWithType: CostDto = {costType: costCategory._id, ...cost};
        costList.push(costWithType);
      });
    });
    return CostService.sortCostListByDate(costList);
  }

  makeFirstLetterCapital(word: string) {
    return makeFirstLetterCapital(word);
  }

}
