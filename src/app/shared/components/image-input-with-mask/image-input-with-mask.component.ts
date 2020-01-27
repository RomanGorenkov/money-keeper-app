import { Component, Input, OnInit } from '@angular/core';

import { ImageInputComponent } from '../image-input/image-input.component';

@Component({
  selector: 'app-image-input-with-mask',
  templateUrl: './image-input-with-mask.component.html',
  styleUrls: ['../image-input/image-input.component.scss']
})
export class ImageInputWithMaskComponent extends ImageInputComponent implements OnInit {

  @Input() maskColor: string;

  ngOnInit() {
    this.previewImage = this.previewImage ? this.previewImage : this.inputData.defaultImageUrl;
  }

}
