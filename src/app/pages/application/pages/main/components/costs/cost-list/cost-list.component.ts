import { Component, OnInit } from '@angular/core'

import { CostItemConfig } from '../../../interfaces/expense-item-config.interface'
import { CostService } from '../../../../../../../services/cost/cost.service'
import { CostCategoryService } from '../../../../../../../services/cost-category/cost-category.service'

@Component({
  selector: 'app-expense-list',
  templateUrl: './cost-list.component.html',
  styleUrls: ['./cost-list.component.scss'],
})
export class CostListComponent implements OnInit {
  categoryList: CostItemConfig[] = []

  constructor(private costCategoryService: CostCategoryService, private costService: CostService) {}

  ngOnInit() {
    this.subscribeOnCategoryListChange()
  }

  private subscribeOnCategoryListChange() {
    this.costCategoryService.setCostCategoryListByNameList(this.costService.getAllCostsNames())
    this.costCategoryService.costCategoryList.subscribe(categoryList => (this.categoryList = categoryList))
  }
}
