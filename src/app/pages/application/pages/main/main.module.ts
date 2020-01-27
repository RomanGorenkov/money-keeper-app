import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';

import { MainComponent } from './Pages/main.component';
import { HomeComponent } from './Pages/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ReportTablePageComponent } from './Pages/report-table-page/report-table-page.component';
import { ReportGraphsPageComponent } from './Pages/report-graphs-page/report-graphs-page.component';
import { DatePickerComponent } from './components/date-controller/date-picker/date-picker.component';
import { DateSwitcherComponent } from './components/date-controller/date-switcher/date-switcher.component';
import { DateControllerComponent } from './components/date-controller/date-controller.component';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseItemComponent } from './components/expense/expense-list/expense-item/expense-item.component';
import { AddExpenseItemComponent } from './components/expense/expense-list/add-expense-item/add-expense-item.component';
import { DialogModule } from '../../../dialog/dialog.module';
import { CostListModalWindowComponent } from './components/expense/modal-windows/cost-list-modal-window/cost-list-modal-window.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { ReportGraphsComponent } from './components/report-graphs/report-graphs.component';
import {
  AddExpenseModalWindowComponent
} from './components/expense/modal-windows/add-expense-modal-window/add-expense-modal-window.component';
import {
  AddCostCategoryModalWindowComponent
} from './components/expense/modal-windows/add-cost-category-modal-window/add-cost-category-modal-window.component';
import { InformationSpanComponent } from './components/information-span/information-span.component';

@NgModule({
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    TranslateModule,
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    ReportTablePageComponent,
    ReportGraphsPageComponent,
    DatePickerComponent,
    DateSwitcherComponent,
    DateControllerComponent,
    ExpenseListComponent,
    ExpenseItemComponent,
    AddExpenseItemComponent,
    CostListModalWindowComponent,
    ReportTableComponent,
    ReportGraphsComponent,
    AddExpenseModalWindowComponent,
    AddCostCategoryModalWindowComponent,
    InformationSpanComponent,
  ],
  providers: [],
  exports: [
    MainComponent,
    HomeComponent,
    ReportTablePageComponent,
    ReportGraphsPageComponent,
  ],
  entryComponents: [
    AddCostCategoryModalWindowComponent,
    AddExpenseModalWindowComponent,
    CostListModalWindowComponent,
    DateSwitcherComponent,
  ],
})

export class MainModule {
}
