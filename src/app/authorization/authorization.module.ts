import {NgModule} from '@angular/core';
import {AuthorizationPageComponent} from './pages/authorization-page/authorization-page.component';
import {TextInputComponent} from './components/text-input/text-input.component';
import {AuthorizationFormComponent} from './components/authorization-form/authorization-form.component';
import {HeaderWrapperComponent} from './components/header-wrapper/header-wrapper.component';
import {ButtonComponent} from './components/button/button.component';
import {IconSpriteComponent} from './components/icon-sprite/icon-sprite.component';
import {SvgSpritesComponent} from '../../assets/icons/svg-sprites/svg-sprites.component';
import {AuthorizationRoutingModule} from './authorization-routing.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication/authentication.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AuthorizationPageComponent,
    TextInputComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
    IconSpriteComponent,
    SvgSpritesComponent,
  ],
  providers: [
    AuthenticationService,
  ],
  exports: [
    AuthorizationPageComponent,
    TextInputComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
    IconSpriteComponent,
    SvgSpritesComponent,
  ]
})
export class AuthorizationModule {
}
