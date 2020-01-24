import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

type Preview = string | ArrayBuffer | SafeResourceUrl;

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
