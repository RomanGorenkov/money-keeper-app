import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
import { CostListComponent } from './components/costs/cost-list/cost-list.component';
import { CostItemComponent } from './components/costs/cost-list/cost-item/cost-item.component';
import { AddCostItemComponent } from './components/costs/cost-list/add-cost-item/add-cost-item.component';
import { DialogModule } from '../../../dialog/dialog.module';
import { CostListModalWindowComponent } from './components/costs/modal-windows/cost-list-modal-window/cost-list-modal-window.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { ReportGraphsComponent } from './components/report-graphs/report-graphs.component';
import { AddCostModalWindowComponent } from './components/costs/modal-windows/add-cost-modal-window/add-cost-modal-window.component';
import { AddCostCategoryModalWindowComponent } from './components/costs/modal-windows/add-cost-category-modal-window/add-cost-category-modal-window.component';
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
    CostListComponent,
    CostItemComponent,
    AddCostItemComponent,
    CostListModalWindowComponent,
    ReportTableComponent,
    ReportGraphsComponent,
    AddCostModalWindowComponent,
    AddCostCategoryModalWindowComponent,
    InformationSpanComponent,
  ],
  providers: [
    CurrencyPipe,
  ],
  exports: [
    MainComponent,
    HomeComponent,
    ReportTablePageComponent,
    ReportGraphsPageComponent,
  ],
  entryComponents: [
    AddCostCategoryModalWindowComponent,
    AddCostModalWindowComponent,
    CostListModalWindowComponent,
    DateSwitcherComponent,
  ],
})

export class MainModule {
}
