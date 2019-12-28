import {Component, Input, ElementRef, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-test-button',
  templateUrl: './test-button.component.html',
  styleUrls: ['./test-button.component.scss']
})
export class TestButtonComponent implements OnInit {

  @Input() color: 'primary' | 'success' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() outline = false;


  rootClass: string;
  classMap: any;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.rootClass = this.elementRef.nativeElement.tagName.toLowerCase(); // returns 'app-button'
    this.updateClassMap();
  }

  updateClassMap() {
    this.classMap = {
      [`${this.rootClass}`]: true,
      [`${this.rootClass}--${this.color}`]: !!this.color, // Add this class if true
      [`${this.rootClass}--outline`]: this.outline, // Add this class if true
      [`${this.rootClass}--disabled`]: this.disabled, // Add this class if true
    };
  }

}
