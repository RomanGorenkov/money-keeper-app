import { Component, OnInit } from '@angular/core';
import {ModalWindowServiceService} from './services/modal-window/modal-window-service.service';
import {DialogService} from '../dialog/services/dialog/dialog.service';
import {ExpenseModalWindowComponent} from './components/expense-modal-window/expense-modal-window.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
