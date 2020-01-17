import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { AuthorizationModule } from './pages/authorization/authorization.module';
import { PresetService } from './services/preset/preset.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthorizationJwtInterceptor } from './interceptors/authorization-jwt.Interceptor';
import { AuthGuard } from './guards/main.guars';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './services/user/user.service';
import { CostService } from './services/cost/cost.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthorizationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationJwtInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true,
    // },
    CostService,
    UserService,
    PresetService,
    AuthGuard,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
