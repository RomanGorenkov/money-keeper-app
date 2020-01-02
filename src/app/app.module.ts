import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/app.component';
import {AuthorizationModule} from './pages/authorization/authorization.module';
import {MainModule} from './pages/main/main.module';
import {PresetService} from './services/preset/preset.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationJwtInterceptor } from './interceptors/authorization-jwt.Interceptor';
import { AuthGuard } from './guards/main.guars';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationJwtInterceptor,
      multi: true,
    },
    PresetService,
    AuthGuard,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
