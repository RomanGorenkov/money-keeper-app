import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormInput } from '../../../pages/authorization/interfaces/form-input.interface';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent {

  @Input() previewImage: string | ArrayBuffer;
  @Input() inputData: FormInput;
  @Input() control: FormControl;
  @Output() imageSelected: EventEmitter<string | ArrayBuffer> = new EventEmitter<string | ArrayBuffer>();

  fileData: File = null;

  changePreviewImage(fileInput: any) {
    if (fileInput.target.files.length === 0) {
      return;
    }
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.previewImage = reader.result;
      this.imageSelected.emit(reader.result);
    };
  }
}
