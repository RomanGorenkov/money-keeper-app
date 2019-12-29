import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {MainComponent} from './main.component';
import {routing} from '../global-constants/routing';
import {ReportTablePageComponent} from './Pages/report-table-page/report-table-page.component';
import {ReportGraphsPageComponent} from './Pages/report-graphs-page/report-graphs-page.component';
import {AuthGuard} from '../authorization/guards/main.guars';



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
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: routing.main.reportTable,
        component: ReportTablePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: routing.main.reportGraphs,
        component: ReportGraphsPageComponent,
        canActivate: [AuthGuard],
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
