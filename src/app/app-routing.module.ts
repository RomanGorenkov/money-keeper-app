import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { roads } from './global-constants/roads'
import { AuthGuard } from './guards/auth-guard'

const routes: Routes = [
  {
    path: roads.authorisation.root,
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule),
  },
  {
    path: roads.app.root,
    loadChildren: () => import('./pages/application/application.module').then(m => m.ApplicationModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: roads.authorisation.root,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
