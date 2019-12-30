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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AuthGuard} from './guards/main.guars';
import {UserService} from './services/user/user.service';
import {AuthorizationJwtInterceptor} from './interceptors/authorization-jwt.Interceptor';


@NgModule({
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AuthorizationPageComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
    IconSpriteComponent,
    SvgSpritesComponent,
    TextInputComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationJwtInterceptor,
      multi: true,
    },
    AuthenticationService,
    AuthGuard,
    JwtHelperService,
    UserService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ],
  exports: [
    AuthorizationPageComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
    IconSpriteComponent,
    SvgSpritesComponent,
    TextInputComponent,
  ]
})
export class AuthorizationModule {
}
