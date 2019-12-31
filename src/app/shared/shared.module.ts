import {NgModule} from '@angular/core';
import {TextInputComponent} from './components/text-input/text-input.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TextInputComponent
  ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [
    TextInputComponent
  ]
})
export class SharedModule {
}
