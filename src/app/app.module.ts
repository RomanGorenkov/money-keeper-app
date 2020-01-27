import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { AuthorizationModule } from './pages/authorization/authorization.module';
import { PresetService } from './services/preset/preset.service';
import { AuthorizationJwtInterceptor } from './interceptors/authorization-jwt.Interceptor';
import { AuthGuard } from './guards/main.guars';
import { UserService } from './services/user/user.service';
import { CostService } from './services/cost/cost.service';
import { CostCategoryService } from './services/cost-category/cost-category.service';
import { CostApiService } from './services/cost-api/cost-api.service';
import { StorageService } from './services/storage/storage.service';
import { DateService } from './services/date/date.service';
import { HttpLoaderFactory } from './helpers/http-loader-factory.helper';

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
        deps: [
          HttpClient,
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationJwtInterceptor,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    CostService,
    CostCategoryService,
    CostApiService,
    StorageService,
    UserService,
    PresetService,
    DateService,
    AuthGuard,
    JwtHelperService,
    DatePipe,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {
}

