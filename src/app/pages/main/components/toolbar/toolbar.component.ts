import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @ViewChild('toolsContainer', {static: false})
  private toolsContainer: ElementRef;
  openedMenu: string = null;

  openToolbar(): void {
    if (this.toolsContainer.nativeElement.classList.contains('hidden')) {
      this.toolsContainer.nativeElement.classList.remove('hidden');
    } else {
      this.toolsContainer.nativeElement.classList.add('hidden');
      this.openedMenu = null;
    }
  }

  onChangeDropdown(dropdownName: string = null) {
    this.openedMenu = dropdownName;
  }

  onOverlayClicked(event: MouseEvent) {
    if (event.target ===  this.toolsContainer.nativeElement) {
      this.openToolbar();
    }
  }

  onToolbarClicked(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName !== 'BUTTON') {
      this.openedMenu = null;
    }
  }
}
