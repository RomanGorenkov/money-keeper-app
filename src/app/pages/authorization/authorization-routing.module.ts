import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component'
import { roads } from '../../global-constants/roads'

const AuthorizationRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: roads.authorisation.login,
        pathMatch: 'full',
      },
      {
        path: ':type',
        component: AuthorizationPageComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(AuthorizationRouting)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
