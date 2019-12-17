import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthorizationPageComponent } from './authorization/pages/authorization-page/authorization-page.component';
import { TextInputComponent } from './authorization/components/text-input/text-input.component';
import { AuthorizationFormComponent } from './authorization/components/authorization-form/authorization-form.component';
import { HeaderWrapperComponent } from './authorization/components/header-wrapper/header-wrapper.component';
import { ButtonComponent } from './authorization/components/button/button.component';
import { IconSpriteComponent } from './authorization/components/icon-sprite/icon-sprite.component';
import { SvgSpritesComponent } from '../assets/icons/svg-sprites/svg-sprites.component';
import {AuthorizationModule} from './authorization/authorization.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthorizationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
