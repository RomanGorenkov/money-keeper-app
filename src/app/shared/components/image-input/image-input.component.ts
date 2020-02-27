import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl } from '@angular/forms'

import { FormInput } from '../../../pages/authorization/interfaces/form-input.interface'
import { FileExpansions } from '../../../global-constants/file-expansions'
import { ValueTypes } from '../../../global-constants/valueTypes'
import { Preview } from '../../../types/preview.type'

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent {
  @Input() fileExpansion: string
  @Input() previewImage: Preview
  @Input() inputData: FormInput
  @Input() control: FormControl
  @Output() imageSelected = new EventEmitter<Preview>()

  fileData: File = null
  validFileFormat = true

  changePreviewImage(fileInput: Event) {
    const files = (fileInput.target as HTMLInputElement).files

    this.validateFile(files[0].name, this.fileExpansion)
    if (this.validFileFormat && files.length) {
      this.fileData = files[0]
      this.preview()
    }
  }

  preview() {
    const mimeType = this.fileData.type
    const imageUrl = URL.createObjectURL(this.fileData)

    if (mimeType.match(/image\/*/) == null) {
      return
    }
    const reader = new FileReader()

    reader.readAsDataURL(this.fileData)
    reader.onload = () => {
      if (typeof reader.result === ValueTypes.STRING) {
        this.previewImage = imageUrl
        this.imageSelected.emit(reader.result)
      }
    }
  }

  validateFile(name: string, expansion: string = '') {
    const fileExpansion = name.substring(name.lastIndexOf('.') + 1).toLowerCase() as FileExpansions
    const bannedExtensions = [FileExpansions.SVG]

    this.validFileFormat = expansion ? fileExpansion === expansion : !bannedExtensions.includes(fileExpansion)
    if (this.validFileFormat) {
      this.control.setErrors(null)
    } else {
      this.control.setErrors({ incorrect: false })
    }
  }
}
