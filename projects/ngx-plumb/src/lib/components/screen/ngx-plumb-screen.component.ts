import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, RendererFactory2, ViewChild, ViewContainerRef } from '@angular/core';

import { BrowserJsPlumbInstance, EVENT_CLICK, EVENT_CONNECTION_CLICK, EVENT_DRAG_STOP, EVENT_ELEMENT_CLICK, EVENT_ELEMENT_DBL_CLICK, newInstance } from '@jsplumb/browser-ui';
import { BezierConnector } from '@jsplumb/connector-bezier';
import { Connection, INTERCEPT_BEFORE_DETACH, INTERCEPT_BEFORE_DRAG, INTERCEPT_BEFORE_DROP, INTERCEPT_BEFORE_START_DETACH } from '@jsplumb/core';


import { ConnectionInstance } from '../../logic/connection-instance';
import { NodeInstance } from '../../logic/node-instance.class';
import { NgxPlumbService } from '../../services/ngx-plumb.service';

@Component({
  selector: 'ngx-plumb-screen',
  templateUrl: './ngx-plumb-screen.component.html',
  styleUrls: ['./ngx-plumb-screen.component.css']
})
export class NgxPlumbScreenComponent implements OnInit {

  private _jsPlumbInstance: BrowserJsPlumbInstance;
  private _nativeElementToNodeInstance = new Map<any, NodeInstance>();
  private _renderer: Renderer2;

  @ViewChild('nodeInstances', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  @Input() nodeInstances!: NodeInstance[];
  @Input() connectionInstances!: ConnectionInstance[];

  @Input() zoom: number;

  @Output() clickedElement = new EventEmitter<string>();
  @Output() doubleClickedElement = new EventEmitter<string>();
  @Output() clickedConnection = new EventEmitter<string>();

  constructor(private ngxPlumbService: NgxPlumbService, private elementRef: ElementRef, private factory: RendererFactory2, private readonly viewRef: ViewContainerRef) {
    this._renderer = factory.createRenderer(null, null);
    this.zoom = 0.5;
    this._jsPlumbInstance = newInstance({
      container: this.elementRef.nativeElement,
      dragOptions: {
        grid: { h: 20, w: 20 }
      }
    });
  }

  ngOnInit(): void {
    if (!this.viewContainerRef) throw ("NGX_PLUMB: No ViewContainerRef");
    this._updateNodeComponents();

    this._jsPlumbInstance.bind(EVENT_ELEMENT_CLICK, (a: Element, _e: PointerEvent) => {
      const nativeElement = this.ngxPlumbService.getElementFromHtml(this._jsPlumbInstance, a);
      const nodeInstance = this._nativeElementToNodeInstance.get(nativeElement);
      if (!nodeInstance) return;
      this.clickedElement.emit(nodeInstance.id);
    });

    this._jsPlumbInstance.bind(EVENT_CONNECTION_CLICK, (a: Connection) => {
      const id = a.getId();
      this.clickedConnection.emit(id);
    });

    this._jsPlumbInstance.bind(EVENT_ELEMENT_DBL_CLICK, (a: Element, _e: PointerEvent) => {
      const nativeElement = this.ngxPlumbService.getElementFromHtml(this._jsPlumbInstance, a);
      const nodeInstance = this._nativeElementToNodeInstance.get(nativeElement);
      if (!nodeInstance) return;
      this.doubleClickedElement.emit(nodeInstance.id);
    });

    // this._renderer.setStyle(this.elementRef.nativeElement, 'transform', `scale(${this.zoom})`);
    // this._jsPlumbInstance.setZoom(this.zoom);
  }

  ngAfterViewInit(): void {
    this._updateConnections();
  }

  ngOnChanges() {
  }


  _updateConnections(): void {
    this.connectionInstances.forEach(ci => {
      const x = this.ngxPlumbService.getEndpoint(this._jsPlumbInstance, ci.source.nodeId, ci.source.endpointId);
      const y = this.ngxPlumbService.getEndpoint(this._jsPlumbInstance, ci.target.nodeId, ci.target.endpointId);
      const connection = this._jsPlumbInstance.connect({
        source: x,
        target: y,
        connector: ci.definition.connectorSpec,
        overlays: ci.definition.overlaySpecs
      });
      console.log("CXX", connection.getId());
    });
  }

  _updateNodeComponents(): void {
    this.ngxPlumbService.clear(this.viewContainerRef);
    this.nodeInstances.forEach(ni => {
      const componentInstance = this.ngxPlumbService.createNodeInstanceComponent(this._jsPlumbInstance, this.viewContainerRef, this.elementRef, ni);
      componentInstance.position = ni.box.leftTop;
      componentInstance.dimension = ni.box.dimension;
      const elementRef = componentInstance.ref;
      this._nativeElementToNodeInstance.set(elementRef.nativeElement, ni);
      this._jsPlumbInstance.setDraggable(elementRef.nativeElement, ni.nodeDefinition.draggable);
    });
  }
}
