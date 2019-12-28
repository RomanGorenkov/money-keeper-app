import {Component, Input, OnInit} from '@angular/core';
import {ExpenseItemConfig} from '../../../../interfaces/expense-item-config.interface';
import {CostsService} from '../../../../services/costs/costs.service';
import {ModalWindowServiceService} from '../../../../services/modal-window/modal-window-service.service';
import {DialogService} from '../../../../../dialog/services/dialog/dialog.service';
import {AddExpenseModalWindowComponent} from '../../modal-windows/add-expense-modal-window/add-expense-modal-window.component';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {

  @Input() expenseItemConfig: ExpenseItemConfig;
  @Input() iconId: string;


  constructor(
    private costsService: CostsService,
    private modalService: ModalWindowServiceService,
    private dialog: DialogService,
  ) {
  }

  ngOnInit() {
  }

  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  openModal() {
    this.dialog.open(AddExpenseModalWindowComponent, {data: {title: this.expenseItemConfig.title}});
  }

}
