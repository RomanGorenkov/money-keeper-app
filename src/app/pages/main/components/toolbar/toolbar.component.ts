import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @ViewChild('toolsContainer', {static: false})
  private toolsContainer: ElementRef;

  openToolbar(): void {
    if (this.toolsContainer.nativeElement.classList.contains('hidden')) {
      this.toolsContainer.nativeElement.classList.remove('hidden');
    } else {
      this.toolsContainer.nativeElement.classList.add('hidden');
    }
  }

}
