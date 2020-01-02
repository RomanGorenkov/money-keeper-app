import { NgModule } from '@angular/core';
import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { HeaderWrapperComponent } from './components/header-wrapper/header-wrapper.component';
import { ButtonComponent } from './components/button/button.component';
import { SvgSpritesComponent } from '../../../assets/icons/svg-sprites/svg-sprites.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    AuthorizationPageComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
    SvgSpritesComponent,
  ],
  providers: [
    AuthenticationService,
  ],
  exports: [
    AuthorizationPageComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
    SvgSpritesComponent,
  ]
})
export class AuthorizationModule {
}
