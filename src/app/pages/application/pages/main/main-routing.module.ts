import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { MainComponent } from './Pages/main.component';
import { routing } from '../../../../global-constants/routing';
import { ReportTablePageComponent } from './Pages/report-table-page/report-table-page.component';
import { ReportGraphsPageComponent } from './Pages/report-graphs-page/report-graphs-page.component';
import { AuthGuard } from '../../../../guards/main.guars';


const MainRouting: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: routing.app.main.home,
        pathMatch: 'full'
      },
      {
        path: routing.app.main.home,
        component: HomeComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: routing.app.main.reportTable,
        component: ReportTablePageComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: routing.app.main.reportGraphs,
        component: ReportGraphsPageComponent,
        // canActivate: [AuthGuard],
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
