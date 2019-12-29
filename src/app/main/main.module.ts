import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './Pages/home/home.component';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {TestButtonComponent} from './components/test-button/test-button.component';
import {SettingsPageComponent} from './Pages/settings-page/settings-page.component';
import {MainRoutingModule} from './main-routing.module';
import {ReportTablePageComponent} from './Pages/report-table-page/report-table-page.component';
import {ReportGraphsPageComponent} from './Pages/report-graphs-page/report-graphs-page.component';
import {DatePickerComponent} from './components/date-controller/date-picker/date-picker.component';
import {DateSwitcherComponent} from './components/date-controller/date-switcher/date-switcher.component';
import {DateControllerComponent} from './components/date-controller/date-controller.component';
import {DateService} from './services/date/date.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExpenseListComponent} from './components/expense/expense-list/expense-list.component';
import {ExpenseItemComponent} from './components/expense/expense-list/expense-item/expense-item.component';
import {AddExpenseItemComponent} from './components/expense/expense-list/add-expense-item/add-expense-item.component';
import {UserService} from './services/user/user.service';
import {CostsService} from './services/costs/costs.service';
import {ModalWindowComponent} from './components/modal-window/modal-window.component';
import {ExpenseModalWindowComponent} from './components/expense-modal-window/expense-modal-window.component';
import {DialogModule} from '../dialog/dialog.module';
import {AddExpenseModalWindowComponent} from './components/expense/modal-windows/add-expense-modal-window/add-expense-modal-window.component';
import {AuthorizationModule} from '../authorization/authorization.module';


@NgModule({
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    AuthorizationModule,
  ],
  declarations: [
    MainComponent,
    ToolbarComponent,
    NavbarComponent,
    HomeComponent,
    DropdownMenuComponent,
    TestButtonComponent,
    SettingsPageComponent,
    ReportTablePageComponent,
    ReportGraphsPageComponent,
    DatePickerComponent,
    DateSwitcherComponent,
    DateControllerComponent,
    ExpenseListComponent,
    ExpenseItemComponent,
    AddExpenseItemComponent,
    ModalWindowComponent,
    ExpenseModalWindowComponent,
    AddExpenseModalWindowComponent,
  ],
  providers: [
    DateService,
    UserService,
    CostsService,
  ],
  exports: [
    MainComponent,
    ToolbarComponent,
    NavbarComponent,
    HomeComponent,
    DropdownMenuComponent,
    TestButtonComponent,
    SettingsPageComponent,
    ReportTablePageComponent,
    ReportGraphsPageComponent,
    ExpenseModalWindowComponent,
  ],
  entryComponents: [
    ExpenseModalWindowComponent,
    ModalWindowComponent,
    AddExpenseModalWindowComponent,
  ]
})
export class MainModule {
}
