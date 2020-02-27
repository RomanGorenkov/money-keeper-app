import { Component, OnInit } from '@angular/core'

import { CostDto } from '../../interfaces/cost-dto.intarfece'
import { CostService } from '../../../../../../services/cost/cost.service'
import { makeFirstLetterCapital } from '../../../../../../helpers/string'
import { DateFormat } from '../../../../../../global-constants/date-format'
import { PresetService } from '../../../../../../services/preset/preset.service'

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  DateFormat = DateFormat
  costList: CostDto[] = []

  constructor(public costService: CostService, public presetService: PresetService) {}

  ngOnInit() {
    this.onChangeCostList()
  }

  getCostList(): CostDto[] {
    const costList: CostDto[] = []
    this.costService.currentCostList.getValue().map(costCategory => {
      costCategory.costList.map(cost => {
        const costWithType: CostDto = { costType: costCategory._id, ...cost }
        costList.push(costWithType)
      })
    })
    return CostService.sortCostListByDate(costList)
  }

  makeFirstLetterCapital(word: string) {
    return makeFirstLetterCapital(word)
  }

  onChangeCostList() {
    this.costService.currentCostList.subscribe(() => (this.costList = this.getCostList()))
  }
}
