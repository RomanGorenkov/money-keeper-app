import { NgModule } from '@angular/core';
import { SettingsPageComponent } from './pages/settings-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    CommonModule
  ],
  declarations: [
    SettingsPageComponent
  ],
  providers: [
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class UserSettingsModule {
}
