import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './pages/dialog.component';
import { InsertionDirective } from './directives/insertion.directive';
import { DialogConfig } from './config/dialog-config';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DialogConfig,
  ],
  declarations: [
    DialogComponent,
    InsertionDirective,
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class DialogModule {
}
