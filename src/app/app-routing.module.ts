import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routing} from './global-constants/routing';
import { AuthGuard } from './guards/main.guars';


const routes: Routes = [
  {
    path: routing.authorisation.root,
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: routing.app.root,
    loadChildren: () => import('./pages/application/application.module').then(m => m.ApplicationModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: routing.authorisation.root,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
