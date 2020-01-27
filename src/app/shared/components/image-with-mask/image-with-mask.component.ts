import { Component, Input } from '@angular/core';

import { Preview } from '../../../types/preview.type';

@Component({
  selector: 'app-image-with-mask',
  templateUrl: './image-with-mask.component.html',
  styleUrls: ['./image-with-mask.component.scss']
})
export class ImageWithMaskComponent {

  @Input() imageForMask: Preview;
  @Input() maskColor: string;

  get imageUrl() {
    return this.imageForMask ? `url('${this.imageForMask}')` : null;
  }

}
