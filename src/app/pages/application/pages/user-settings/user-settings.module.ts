import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { SettingsPageComponent } from './pages/settings-page.component'
import { SharedModule } from '../../../../shared/shared.module'

@NgModule({
  imports: [ReactiveFormsModule, TranslateModule, SharedModule, CommonModule],
  declarations: [SettingsPageComponent],
})
export class UserSettingsModule {}
