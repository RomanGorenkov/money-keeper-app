import { Component, Input, OnInit } from '@angular/core';

import { ImageInputComponent } from '../image-input/image-input.component';

@Component({
  selector: 'app-image-input-with-mask',
  templateUrl: './image-input-with-mask.component.html',
  styleUrls: ['../image-input/image-input.component.scss']
})
export class ImageInputWithMaskComponent extends ImageInputComponent implements OnInit {

  @Input() maskColor: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.previewImage = this.previewImage ? this.previewImage : this.inputData.defaultImageUrl;
  }

  preview() {
    const mimeType = this.fileData.type;
    const imageUrl = URL.createObjectURL(this.fileData);
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.previewImage = imageUrl;
      }
      this.imageSelected.emit(reader.result);
    };
  }

}
