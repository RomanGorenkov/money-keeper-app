import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routing } from '../../global-constants/routing';
import { SettingsPageComponent } from './pages/user-settings/pages/settings-page.component';
import { ApplicationComponent } from './pages/application.component';


const ApplicationRouting: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
      },
      {
        path: routing.app.setting,
        component: SettingsPageComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
      },
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ApplicationRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class ApplicationRoutingModule {
}
