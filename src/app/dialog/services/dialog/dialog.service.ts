import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {DialogModule} from '../../dialog.module';
import {DialogComponent} from '../../dialog.component';
import {DialogConfig} from '../../config/dialog-config';
import {config} from 'rxjs';
import {DialogInjector} from '../../dialog-injector';

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
  }

  appendDialogComponentToBody(dialogConfig: DialogConfig) {
    const map = new WeakMap();
    map.set(DialogConfig, dialogConfig);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    // const componentRef = componentFactory.create(this.injector);

    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.dialogComponentRef = componentRef;
    this.onCloseDialogEventSubscribe(componentRef);
  }

  public removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  // public open(componentType: Type<any>) {
  //   this.appendDialogComponentToBody();
  //   this.dialogComponentRef.instance.childComponentType = componentType;
  // }

  public open(componentType: Type<any>, dialogConfig: DialogConfig) {
    this.appendDialogComponentToBody(dialogConfig);

    this.dialogComponentRef.instance.childComponentType = componentType;

  }

  onCloseDialogEventSubscribe(dialogComponentRef: ComponentRef<DialogComponent>) {
    dialogComponentRef.instance.onClose.subscribe(
      () => {
        this.removeDialogComponentFromBody();
      },
      error => {
        console.log(error);
      }
    );
  }
}
