import { Component } from '@angular/core';

import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { ButtonsSign } from '../../../../../../../../global-constants/buttons-sign';
import {
  AddCostCategoryModalWindowComponent
} from '../../modal-windows/add-cost-category-modal-window/add-cost-category-modal-window.component';

@Component({
  selector: 'app-add-expense-item',
  templateUrl: './add-expense-item.component.html',
  styleUrls: ['./add-expense-item.component.scss']
})
export class AddExpenseItemComponent {

  buttonsSign = ButtonsSign;

  constructor(
    private dialog: DialogService
  ) {
  }

  openModal() {
    this.dialog.open(AddCostCategoryModalWindowComponent, {});
  }

}
