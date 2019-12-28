import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalWindowServiceService} from '../../services/modal-window/modal-window-service.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent  implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalWindowServiceService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal-window must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal-window on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    // add self (this modal-window instance) to the modal-window service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal-window service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal-window
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-window-open');
  }

  // close modal-window
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-window-open');
  }
}
