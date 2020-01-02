import { Component, Input } from '@angular/core';
import { ExpenseItemConfig } from '../../../../interfaces/expense-item-config.interface';
import { PresetService } from '../../../../../../services/preset/preset.service';
import { DialogService } from '../../../../../dialog/services/dialog/dialog.service';
import { AddExpenseModalWindowComponent } from '../../modal-windows/add-expense-modal-window/add-expense-modal-window.component';
import { DateService } from '../../../../services/date/date.service';
import { CostListModalWindowComponent } from '../../modal-windows/cost-list-modal-window/cost-list-modal-window.component';
import { CostService } from '../../../../services/cost/cost.service';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent {
  @Input() expenseItemConfig: ExpenseItemConfig;
  @Input() iconId: string;

  constructor(
    public presetService: PresetService,
    private costService: CostService,
    private dialog: DialogService,
    private dateService: DateService,
  ) {
  }

  get currentCostValue() {
    const currentCost = this.getCurrentUserCost();
    if (currentCost) {
      return currentCost.costSum;
    } else {
      return 0;
    }
  }


  openModal() {
    if (this.dateService.currentElement.switcherName === 'today') {
      this.dialog.open(AddExpenseModalWindowComponent, {data: {title: this.expenseItemConfig.title}});
    } else {
      this.dialog.open(CostListModalWindowComponent, {data: {title: this.expenseItemConfig.title}});
    }
  }

  getCurrentUserCost() {
    return this.costService.currentCostList.find(costItem => costItem._id === this.expenseItemConfig.title);
  }
}
