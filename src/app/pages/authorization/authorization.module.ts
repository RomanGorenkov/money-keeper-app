import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { HeaderWrapperComponent } from './components/header-wrapper/header-wrapper.component';
import { ButtonComponent } from './components/button/button.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthenticationService } from './services/authentication/authentication.service';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [
    AuthorizationPageComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
  ],
  providers: [
    AuthenticationService,
  ],
  exports: [
    AuthorizationPageComponent,
    AuthorizationFormComponent,
    HeaderWrapperComponent,
    ButtonComponent,
  ]
})
export class AuthorizationModule {
}
