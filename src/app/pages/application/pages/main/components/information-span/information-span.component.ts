import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-span',
  templateUrl: './information-span.component.html',
  styleUrls: ['./information-span.component.scss']
})
export class InformationSpanComponent {

  @Input() inputData;

}
