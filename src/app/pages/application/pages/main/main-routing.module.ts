import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routing } from '../../../../global-constants/routing';
import { HomeComponent } from './Pages/home/home.component';
import { MainComponent } from './Pages/main.component';
import { ReportTablePageComponent } from './Pages/report-table-page/report-table-page.component';
import { ReportGraphsPageComponent } from './Pages/report-graphs-page/report-graphs-page.component';

const MainRouting: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: routing.app.main.home,
        pathMatch: 'full',
      },
      {
        path: routing.app.main.home,
        component: HomeComponent,
      },
      {
        path: routing.app.main.reportTable,
        component: ReportTablePageComponent,
      },
      {
        path: routing.app.main.reportGraphs,
        component: ReportGraphsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(MainRouting),
  ],
  exports: [
    RouterModule,
  ],
})

export class MainRoutingModule {
}
