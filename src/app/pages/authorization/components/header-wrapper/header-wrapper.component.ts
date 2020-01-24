import { Component } from '@angular/core';

import { headerButtons } from '../../constants/header-buttons';

@Component({
  selector: 'app-header-wrapper',
  templateUrl: './header-wrapper.component.html',
  styleUrls: ['./header-wrapper.component.scss']
})
export class HeaderWrapperComponent {

  private buttons = headerButtons;

}
