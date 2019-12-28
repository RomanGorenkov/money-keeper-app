import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './directives/insertion.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    InsertionDirective,
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class DialogModule { }
