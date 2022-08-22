import { ElementRef, Injectable, RendererFactory2, ViewContainerRef } from '@angular/core';
import { JsPlumbInstance } from "@jsplumb/core"


import { NgxPlumbNodeComponent } from '../../public-api';
import { NodeInstance } from '../logic/node-instance.class';

@Injectable({
  providedIn: 'root'
})
export class NgxPlumbService {

  constructor(private renderFactory: RendererFactory2) {
  }

  public addNodeInstance(jsPlumbInstance: JsPlumbInstance, viewContainerRef: ViewContainerRef,
    screenElementRef: ElementRef, nodeInstance: NodeInstance): NgxPlumbNodeComponent {
    const injector = viewContainerRef.injector;
    const componentRef = viewContainerRef.createComponent(NgxPlumbNodeComponent, { injector: injector });
    const componentInstance = componentRef.instance
    componentInstance.nodeInstance = nodeInstance;
    componentInstance.jsPlumbInstance = jsPlumbInstance;
    componentInstance.screenElementRef = screenElementRef;
    // const renderer = this.renderFactory.createRenderer(componentRef, null);
    // renderer.setStyle(componentInstance, 'position', 'absolute');
    viewContainerRef.insert(componentRef.hostView);
    return componentInstance;
  }

  public clear(viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();
  }
}
