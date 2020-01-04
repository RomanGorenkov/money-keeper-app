import { Component } from '@angular/core';
import { CostService } from '../../../../services/cost/cost.service';
import { PresetService } from '../../../../services/preset/preset.service';
import { CostDto } from '../../interfaces/cost-dto.intarfece';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent {

  // costList: CostDto[] = [];

  constructor(
    public costService: CostService,
    private presetService: PresetService,
  ) {
    console.log(this.costList);
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

}
