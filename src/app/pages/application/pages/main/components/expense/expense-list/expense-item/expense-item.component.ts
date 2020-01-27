import { Component, Input, OnInit } from '@angular/core';

import { ExpenseItemConfig } from '../../../../interfaces/expense-item-config.interface';
import { UserCosts } from '../../../../../../../authorization/interfaces/user-costs.interface';
import { PresetService } from '../../../../../../../../services/preset/preset.service';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { AddExpenseModalWindowComponent } from '../../modal-windows/add-expense-modal-window/add-expense-modal-window.component';
import { DateService } from '../../../../../../../../services/date/date.service';
import { CostListModalWindowComponent } from '../../modal-windows/cost-list-modal-window/cost-list-modal-window.component';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { switcherNames } from '../../../../constants/date-switcher/switcher-name';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {

  @Input() expenseItemConfig: ExpenseItemConfig;
  @Input() iconId: string;

  currentCostValue = 0;

  constructor(
    public presetService: PresetService,
    private costService: CostService,
    private dialog: DialogService,
    private dateService: DateService,
  ) {
  }

  ngOnInit() {
    this.subscribeOnChangeCurrentCostList();
  }

  openModal() {
    if (this.dateService.currentElement.switcherName === switcherNames.Today) {
      this.dialog.open(AddExpenseModalWindowComponent, {
        data: {
          title: this.expenseItemConfig.title,
          name: this.expenseItemConfig.name,
          color: this.expenseItemConfig.color,
        }
      });
    } else {
      this.dialog.open(CostListModalWindowComponent, {
        data: {
          name: this.expenseItemConfig.name,
          title: this.expenseItemConfig.title,
        }
      });
    }
  }

  subscribeOnChangeCurrentCostList() {
    this.costService.currentCostList
      .subscribe(
        currentCostList => this.setCurrentUserCost(currentCostList),
      );
  }

  setCurrentUserCost(currentCostList: UserCosts[]) {
    const category = currentCostList.find(costItem => costItem._id === this.expenseItemConfig.name);

    this.currentCostValue = category ? category.costSum : 0;
  }

}
