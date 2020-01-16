import { Component } from '@angular/core';
import { ExpenseItemConfig } from '../../../interfaces/expense-item-config.interface';
import { CostService } from '../../../../../../../services/cost/cost.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {

  categoryList: ExpenseItemConfig[] = [];

  constructor(
    public costService: CostService,
  ) {
    this.subscribeOnCategoryListChange();
  }

  subscribeOnCategoryListChange() {
    this.costService.setCostCategoryListByNameList(this.costService.getAllCostsNames());
    this.costService.costCategoryList.subscribe(
      categoryList => {
        this.categoryList = categoryList;
      }
    );
  }


}
