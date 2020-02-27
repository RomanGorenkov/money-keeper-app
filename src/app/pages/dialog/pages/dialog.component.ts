import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core'

import { Subject } from 'rxjs'
import { InsertionDirective } from '../directives/insertion.directive'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild(InsertionDirective, { static: true })
  insertionPoint: InsertionDirective

  componentRef: ComponentRef<any>
  childComponentType: Type<any>
  onClose = new Subject<void>()
  dialogOverlayColor = 'black'

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType)
    this.cd.detectChanges()
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy()
    }
  }

  onOverlayClicked(evt: MouseEvent) {
    this.onClose.next()
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation()
  }

  private loadChildComponent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType)
    const viewContainerRef = this.insertionPoint.viewContainerRef
    viewContainerRef.clear()
    this.componentRef = viewContainerRef.createComponent(componentFactory)
  }
}
