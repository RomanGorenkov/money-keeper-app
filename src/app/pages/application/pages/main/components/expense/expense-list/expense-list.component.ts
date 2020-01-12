import {Component} from '@angular/core';
import {ExpenseItemConfig} from '../../../interfaces/expense-item-config.interface';
import {expenseItems} from '../../../constants/expense-items-config';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {

  expenseListItems: ExpenseItemConfig[] = expenseItems;
}
