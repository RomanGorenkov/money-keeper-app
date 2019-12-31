import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizationModule} from './authorization/authorization.module';
import {MainModule} from './main/main.module';
import {PresetService} from './services/preset/preset.service';

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
  providers: [
    PresetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
