import {NgModule} from '@angular/core';
import {TextInputComponent} from './components/text-input/text-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { RadioInputComponent } from './components/radio-input/radio-input.component';

@NgModule({
  declarations: [
    TextInputComponent,
    ImageInputComponent,
    RadioInputComponent
  ],
    imports: [
        ReactiveFormsModule,
        TranslateModule
    ],
  exports: [
    TextInputComponent,
    ImageInputComponent,
    RadioInputComponent
  ]
})
export class SharedModule {
}
