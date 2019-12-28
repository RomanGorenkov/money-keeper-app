import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routing} from './global-constants/routing';


const routes: Routes = [
  {
    path: routing.authorisation.root,
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: routing.main.root,
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
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
