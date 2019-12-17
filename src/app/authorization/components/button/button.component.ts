import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() placeholder: string;
  @Input() iconId: string;
  @Input() routerUrl: string;
}
