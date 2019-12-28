import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizationModule} from './authorization/authorization.module';
import {MainModule} from './main/main.module';
import {InsertionDirective} from './dialog/directives/insertion.directive';
import {TextInputComponent} from './authorization/components/text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthorizationModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
