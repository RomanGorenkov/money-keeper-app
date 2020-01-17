import { Component } from '@angular/core';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import {
  AddCostCategoryModalWindowComponent
} from '../../modal-windows/add-cost-category-modal-window/add-cost-category-modal-window.component';
import { ButtonsSign } from '../../../../../../../../global-constants/buttonsSign';

@Component({
  selector: 'app-add-expense-item',
  templateUrl: './add-expense-item.component.html',
  styleUrls: ['./add-expense-item.component.scss']
})
export class AddExpenseItemComponent {
  ButtonsSign = ButtonsSign;

  constructor(
    private dialog: DialogService
  ) {
  }

  openModal() {
    this.dialog.open(AddCostCategoryModalWindowComponent, {});
  }

}
