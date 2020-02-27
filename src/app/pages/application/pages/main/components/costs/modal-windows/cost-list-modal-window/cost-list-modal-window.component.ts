import { Component, OnInit } from '@angular/core'

import { CostDto } from '../../../../interfaces/cost-dto.intarfece'
import { CostListModalConfig } from '../../../../interfaces/cost-list-modal-config.interface'
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config'
import { CostService } from '../../../../../../../../services/cost/cost.service'
import { DateService } from '../../../../../../../../services/date/date.service'
import { PresetService } from '../../../../../../../../services/preset/preset.service'
import { makeFirstLetterCapital } from '../../../../../../../../helpers/string'
import { DateFormat } from '../../../../../../../../global-constants/date-format'

@Component({
  selector: 'app-cost-list-modal-window',
  templateUrl: './cost-list-modal-window.component.html',
  styleUrls: ['./cost-list-modal-window.component.scss'],
})
export class CostListModalWindowComponent implements OnInit {
  DateFormat = DateFormat
  costList: CostDto[]
  name: string
  private startDate: number
  constructor(
    public config: DialogConfig<CostListModalConfig>,
    public presetService: PresetService,
    private costService: CostService,
    private dateService: DateService
  ) {}

  private endDate: number

  ngOnInit() {
    this.name = this.config.data.name
    this.setDateLimit()
    this.setUserCategoryCostList()
  }

  private setUserCategoryCostList() {
    this.costList = this.costService.getCostListByCategory(this.name, this.startDate, this.endDate)
  }

  private setDateLimit() {
    this.startDate = this.dateService.currentElement.startDate
    this.endDate = this.startDate + this.dateService.currentElement.endDate
  }

  makeFirstLetterCapital(word: string) {
    return makeFirstLetterCapital(word)
  }
}
