import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './Pages/main.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './Pages/home/home.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { SettingsPageComponent } from './Pages/settings-page/settings-page.component';
import { MainRoutingModule } from './main-routing.module';
import { ReportTablePageComponent } from './Pages/report-table-page/report-table-page.component';
import { ReportGraphsPageComponent } from './Pages/report-graphs-page/report-graphs-page.component';
import { DatePickerComponent } from './components/date-controller/date-picker/date-picker.component';
import { DateSwitcherComponent } from './components/date-controller/date-switcher/date-switcher.component';
import { DateControllerComponent } from './components/date-controller/date-controller.component';
import { DateService } from './services/date/date.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseItemComponent } from './components/expense/expense-list/expense-item/expense-item.component';
import { AddExpenseItemComponent } from './components/expense/expense-list/add-expense-item/add-expense-item.component';
import { DialogModule } from '../dialog/dialog.module';
import { CostListModalWindowComponent } from './components/expense/modal-windows/cost-list-modal-window/cost-list-modal-window.component';
import { SharedModule } from '../../shared/shared.module';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { ReportGraphsComponent } from './components/report-graphs/report-graphs.component';
import { ChartsModule } from 'ng2-charts';
import { AddExpenseModalWindowComponent } from './components/expense/modal-windows/add-expense-modal-window/add-expense-modal-window.component';


@NgModule({
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
  ],
  declarations: [
    MainComponent,
    ToolbarComponent,
    NavbarComponent,
    HomeComponent,
    DropdownMenuComponent,
    SettingsPageComponent,
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
  ],
  providers: [
    DateService,
  ],
  exports: [
    MainComponent,
    ToolbarComponent,
    NavbarComponent,
    HomeComponent,
    DropdownMenuComponent,
    SettingsPageComponent,
    ReportTablePageComponent,
    ReportGraphsPageComponent,
  ],
  entryComponents: [
    AddExpenseModalWindowComponent,
    CostListModalWindowComponent,
    DateSwitcherComponent,
  ]
})
export class MainModule {
}
