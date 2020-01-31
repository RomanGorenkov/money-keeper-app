import { Component, OnInit } from '@angular/core';

import { ExpenseItemConfig } from '../../../interfaces/expense-item-config.interface';
import { CostService } from '../../../../../../../services/cost/cost.service';
import { CostCategoryService } from '../../../../../../../services/cost-category/cost-category.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  categoryList: ExpenseItemConfig[] = [];

  constructor(
    private costCategoryService: CostCategoryService,
    private costService: CostService,
  ) {
  }

  ngOnInit() {
    this.subscribeOnCategoryListChange();
  }

  private subscribeOnCategoryListChange() {
    this.costCategoryService.setCostCategoryListByNameList(this.costService.getAllCostsNames());
    this.costCategoryService.costCategoryList
      .subscribe(
        categoryList => this.categoryList = categoryList,
      );
  }

}
