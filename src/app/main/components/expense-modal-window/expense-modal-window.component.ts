import { Component, OnInit } from '@angular/core';
import {DialogService} from '../../../dialog/services/dialog/dialog.service';
import {DialogRef} from '../../../dialog/dialog-ref';

@Component({
  selector: 'app-expense-modal-window',
  templateUrl: './expense-modal-window.component.html',
  styleUrls: ['./expense-modal-window.component.scss']
})
export class ExpenseModalWindowComponent implements OnInit {

  constructor(
    private dialog: DialogService,
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialog.removeDialogComponentFromBody();
  }

}
