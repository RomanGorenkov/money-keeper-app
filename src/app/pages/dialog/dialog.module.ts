import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DialogComponent } from './pages/dialog.component'
import { InsertionDirective } from './directives/insertion.directive'
import { DialogConfig } from './config/dialog-config'
import { DialogService } from './services/dialog/dialog.service'

@NgModule({
  imports: [CommonModule],
  providers: [DialogConfig, DialogService],
  declarations: [DialogComponent, InsertionDirective],
  entryComponents: [DialogComponent],
})
export class DialogModule {}
