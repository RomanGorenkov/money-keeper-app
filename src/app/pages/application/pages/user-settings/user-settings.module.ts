import { NgModule } from '@angular/core';
import { SettingsPageComponent } from './pages/settings-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ReactiveFormsModule
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
