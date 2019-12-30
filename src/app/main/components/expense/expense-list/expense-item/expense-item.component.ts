import {Component, Input, OnInit} from '@angular/core';
import {ExpenseItemConfig} from '../../../../interfaces/expense-item-config.interface';
import {PresetService} from '../../../../services/preset/preset.service';
import {ModalWindowServiceService} from '../../../../services/modal-window/modal-window-service.service';
import {DialogService} from '../../../../../dialog/services/dialog/dialog.service';
import {AddExpenseModalWindowComponent} from '../../modal-windows/add-expense-modal-window/add-expense-modal-window.component';
import {DateService} from '../../../../services/date/date.service';
import {CostListModalWindowComponent} from '../../modal-windows/cost-list-modal-window/cost-list-modal-window.component';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {

  @Input() expenseItemConfig: ExpenseItemConfig;
  @Input() iconId: string;


  constructor(
    private costsService: PresetService,
    private modalService: ModalWindowServiceService,
    private dialog: DialogService,
    private dateService: DateService,
  ) {
  }

  ngOnInit() {
  }

  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  openModal() {
    if (this.dateService.currentElement.switcherName === 'today') {
      this.dialog.open(AddExpenseModalWindowComponent, {data: {title: this.expenseItemConfig.title}});
    } else {
      this.dialog.open(CostListModalWindowComponent, {data: {title: this.expenseItemConfig.title}});
    }
  }

}
