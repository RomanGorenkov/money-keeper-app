import { Component, OnInit } from '@angular/core';
import {ModalWindowServiceService} from '../../../../services/modal-window/modal-window-service.service';
import {DialogService} from '../../../../../dialog/services/dialog/dialog.service';
import {ExpenseModalWindowComponent} from '../../../expense-modal-window/expense-modal-window.component';
import {ModalWindowComponent} from '../../../modal-window/modal-window.component';

@Component({
  selector: 'app-add-expense-item',
  templateUrl: './add-expense-item.component.html',
  styleUrls: ['./add-expense-item.component.scss']
})
export class AddExpenseItemComponent implements OnInit {

  constructor(
    private modalService: ModalWindowServiceService,
    public dialog: DialogService,
  ) { }

  ngOnInit() {
  }

  // openModal(id: string) {
  //   this.modalService.open(id);
  // }
  openModal() {
    this.dialog.open(ModalWindowComponent);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
