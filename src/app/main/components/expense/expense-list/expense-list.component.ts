import {Component} from '@angular/core';
import {ExpenseItemConfig} from '../../../interfaces/expense-item-config.interface';
import {expenseItems} from '../../../constants/expense-items-config';
import {ModalWindowServiceService} from '../../../services/modal-window/modal-window-service.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {

  expenseListItems: ExpenseItemConfig[] = expenseItems;

  constructor(
    private modalService: ModalWindowServiceService,
  ) {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
