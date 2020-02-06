import { Component, ElementRef, ViewChild } from '@angular/core';

import { roads } from '../../../../global-constants/roads';
import { ButtonsSign } from '../../../../global-constants/buttons-sign';
import { TagNames } from '../../../../global-constants/tag-names';
import { CssStateClasses } from '../../../../global-constants/css- state-classes';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @ViewChild('toolsContainer', {static: false}) private toolsContainer: ElementRef;

  buttonsSign = ButtonsSign;
  openedMenu: string = null;
  settingUrl = roads.app.setting;

  toggleToolbar(): void {
    if (this.toolsContainer.nativeElement.classList.contains(CssStateClasses.hidden)) {
      this.toolsContainer.nativeElement.classList.remove(CssStateClasses.hidden);
    } else {
      this.toolsContainer.nativeElement.classList.add(CssStateClasses.hidden);
      this.openedMenu = null;
    }
  }

  onChangeDropdown(dropdownName: string = null) {
    this.openedMenu = dropdownName;
  }

  onOverlayClicked(event: MouseEvent) {
    if (event.target === this.toolsContainer.nativeElement) {
      this.toggleToolbar();
    }
  }

  onToolbarClicked(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName !== TagNames.Button) {
      this.openedMenu = null;
    }
  }

}
