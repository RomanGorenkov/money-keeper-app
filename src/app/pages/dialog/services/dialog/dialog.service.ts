import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { Subscription } from 'rxjs';

import { DialogComponent } from '../../pages/dialog.component';
import { DialogConfig } from '../../config/dialog-config';
import { DialogInjector } from '../../injectors/dialog-injector';
import { dialogOverlayColor } from '../../constants/dialog-overlay-colors';

@Injectable()
export class DialogService {

  dialogComponentRef: ComponentRef<DialogComponent>;
  private closeSubscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
  }

  appendDialogComponentToBody(dialogConfig: DialogConfig<any>) {
    const map = new WeakMap();

    map.set(DialogConfig, dialogConfig);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
    this.dialogComponentRef = componentRef;
    this.onCloseDialogEventSubscribe(componentRef);
  }

  removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.closeSubscription.unsubscribe();
    this.dialogComponentRef.destroy();
  }

  open<C, D>(componentType: Type<C>, dialogConfig: DialogConfig<D>, overlayColor?: string) {
    this.appendDialogComponentToBody(dialogConfig);
    this.dialogComponentRef.instance.childComponentType = componentType;
    this.setDialogOverlayColor(overlayColor);
  }

  onCloseDialogEventSubscribe(dialogComponentRef: ComponentRef<DialogComponent>) {
    this.closeSubscription = dialogComponentRef.instance.onClose
      .subscribe(
        () => this.removeDialogComponentFromBody(),
        );
  }

  setDialogOverlayColor(overlayColor?: string) {
    this.dialogComponentRef.instance.dialogOverlayColor = overlayColor ? overlayColor : dialogOverlayColor.black;
  }

}
