import { Component } from '@angular/core';

import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { ButtonsSign } from '../../../../../../../../global-constants/buttons-sign';
import {
  AddCostCategoryModalWindowComponent
} from '../../modal-windows/add-cost-category-modal-window/add-cost-category-modal-window.component';

@Component({
  selector: 'app-add-expense-item',
  templateUrl: './add-cost-item.component.html',
  styleUrls: ['./add-cost-item.component.scss']
})
export class AddCostItemComponent {

  buttonsSign = ButtonsSign;

  constructor(
    private dialog: DialogService
  ) {
  }

  openModal() {
    this.dialog.open(AddCostCategoryModalWindowComponent, {});
  }

}
