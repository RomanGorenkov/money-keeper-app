import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizationRoutingModule} from './authorization/authorization-routing.module';


const routes: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthorizationRoutingModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
