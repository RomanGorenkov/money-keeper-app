import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {MainComponent} from './main.component';
import {routing} from '../global-constants/routing';
import {ReportTablePageComponent} from './Pages/report-table-page/report-table-page.component';
import {ReportGraphsPageComponent} from './Pages/report-graphs-page/report-graphs-page.component';



const MainRouting: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: routing.main.home,
        pathMatch: 'full'
      },
      {
        path: routing.main.home,
        component: HomeComponent
      },
      {
        path: routing.main.reportTable,
        component: ReportTablePageComponent
      },
      {
        path: routing.main.reportGraphs,
        component: ReportGraphsPageComponent
      },
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(MainRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {
}
