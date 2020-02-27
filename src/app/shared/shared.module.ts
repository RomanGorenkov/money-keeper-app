import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { TextInputComponent } from './components/text-input/text-input.component'
import { ImageInputComponent } from './components/image-input/image-input.component'
import { RadioInputComponent } from './components/radio-input/radio-input.component'
import { ImageInputWithMaskComponent } from './components/image-input-with-mask/image-input-with-mask.component'
import { ImageWithMaskComponent } from './components/image-with-mask/image-with-mask.component'
import { SafePipe } from './pipes/safe.pipe'

@NgModule({
  declarations: [
    TextInputComponent,
    ImageInputComponent,
    RadioInputComponent,
    ImageInputWithMaskComponent,
    ImageWithMaskComponent,
    SafePipe,
  ],
  imports: [ReactiveFormsModule, TranslateModule, CommonModule],
  exports: [
    TextInputComponent,
    ImageInputComponent,
    RadioInputComponent,
    ImageInputWithMaskComponent,
    ImageWithMaskComponent,
  ],
})
export class SharedModule {}
