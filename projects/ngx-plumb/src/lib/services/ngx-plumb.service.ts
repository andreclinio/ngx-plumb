import { ElementRef, Injectable, RendererFactory2, ViewContainerRef } from '@angular/core';
import { JsPlumbInstance, Endpoint, EndpointOptions } from "@jsplumb/core"
import { AnchorId } from "@jsplumb/common"


import { NgxPlumbNodeComponent } from '../../public-api';

import { ATTRIBUTE_MANAGED } from '@jsplumb/core';
import { BrowserJsPlumbInstance } from '@jsplumb/browser-ui';

import { NodeInstance } from '../logic/node-instance.class';

@Injectable({
  providedIn: 'root'
})
export class NgxPlumbService {
  
  constructor(private renderFactory: RendererFactory2) {
  }
  
  public getElementFromHtml(_jsPlumbInstance: BrowserJsPlumbInstance, a: Element) : Element | undefined {
    if (!a) return undefined;
    const nodeId = a.getAttribute(ATTRIBUTE_MANAGED);
    if (!nodeId) return undefined;
    const nativeElement = this.getElementFromId(_jsPlumbInstance, nodeId);
    return nativeElement;
  }

  public createNodeInstanceComponent(jsPlumbInstance: JsPlumbInstance, viewContainerRef: ViewContainerRef,
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
    jsPlumbInstance.manage(componentInstance.ref.nativeElement, nodeInstance.id);
    return componentInstance;
  }

  public mountUuid(nodeId: string, endpointId: string): string {
    return `${nodeId}::${endpointId}`;
  }

  public getElementFromId(jsPlumbInstance: JsPlumbInstance, nodeId: string): Element | undefined {
    return jsPlumbInstance.getManagedElement(nodeId);
  }

  // public getX(jsPlumbInstance: JsPlumbInstance, nodeId: string): any | undefined {
  //   const connections = jsPlumbInstance.getConnections();
  //   connections.forEach(element => {
      
  //   });
      

  // }

  public getEndpoint(jsPlumbInstance: JsPlumbInstance, nodeId: string, endpointId: string): Endpoint | undefined {
    const element = this.getElementFromId(jsPlumbInstance, nodeId);
    const endpoints = jsPlumbInstance.getEndpoints(element);
    const endpoint = endpoints.find(e => e.uuid === this.mountUuid(nodeId, endpointId));
    return endpoint;
  }

  public addEndpoint(jsPlumbInstance: JsPlumbInstance, nativeElement: Element, nodeId: string, endpointId: string, anchorId: AnchorId, options: EndpointOptions): void {
    jsPlumbInstance.addEndpoint( nativeElement, { anchor: anchorId, uuid: this.mountUuid(nodeId, endpointId), maxConnections: 10 }, options);
  }

  public clear(viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();
  }
}
