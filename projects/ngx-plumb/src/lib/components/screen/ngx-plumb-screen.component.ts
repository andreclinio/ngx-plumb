import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, RendererFactory2, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserJsPlumbInstance, ContainmentType, EVENT_CLICK, EVENT_DRAG_MOVE, EVENT_DRAG_STOP, EVENT_ELEMENT_CLICK, newInstance } from '@jsplumb/browser-ui';
import { JsPlumbInstance, INTERCEPT_BEFORE_DETACH, INTERCEPT_BEFORE_DRAG, INTERCEPT_BEFORE_DROP, INTERCEPT_BEFORE_START_DETACH } from '@jsplumb/core';
import { Box } from '../../logic/box.class';
import { ConnectionInstance } from '../../logic/connection-instance';
import { Dimension } from '../../logic/dimension.class';
import { NodeDefinition } from '../../logic/node-definition.class';
import { NodeInstance } from '../../logic/node-instance.class';
import { Position } from '../../logic/position.class';
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

  @Input() editable: boolean;

  @Input() zoom: number;

  @Output() clickedElement = new EventEmitter<string>();


  constructor(private ngxPlumbService: NgxPlumbService, private elementRef: ElementRef, private factory: RendererFactory2, private readonly viewRef: ViewContainerRef) {
    this._renderer = factory.createRenderer(null, null);
    this.editable = false;
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
    this.ngxPlumbService.clear(this.viewContainerRef);
    this.nodeInstances.forEach(ni => {
      const componentInstance = this.ngxPlumbService.addNodeInstance(this._jsPlumbInstance, this.viewContainerRef, this.elementRef, ni);
      componentInstance.position = ni.box.leftTop;
      componentInstance.dimension = ni.box.dimension;
      const elementRef = componentInstance.ref;
      this._nativeElementToNodeInstance.set(elementRef.nativeElement, ni);
      this._jsPlumbInstance.setDraggable(elementRef.nativeElement, this.editable);
    });


    const hash = this._nativeElementToNodeInstance;
    this._jsPlumbInstance.bind(EVENT_ELEMENT_CLICK, (a: HTMLElement, e: PointerEvent) => {
      console.info(`ELEMENT CLICK:`, a, e);
      if (!a) return;
      const nativeElement = this._jsPlumbInstance.getManagedElement(a.id);
      console.info(`E CLICKED 1: `, a, a.id, nativeElement);
      const nodeInstance = hash.get(nativeElement);
      if (nodeInstance) console.info(`E CLICKED: `, nativeElement, nodeInstance);
      if (!nodeInstance) return;
      this.clickedElement.emit(nodeInstance.id);
    });


    this._jsPlumbInstance.bind(EVENT_CLICK, (a, e) => {
      console.info(`CLICK: ${a} ${e}`);
    });

    this._jsPlumbInstance.bind(EVENT_DRAG_STOP, (a, e) => {
      if (!a || !a.elements) return;
      const elements = a.elements as any[];
      elements.forEach(e => {
        const nativeElement = this._jsPlumbInstance.getManagedElement(e.id);
        const nodeInstance = hash.get(nativeElement);
        if (nodeInstance) console.info(`DRAGGED: ${e.id}`, nativeElement, nodeInstance);
      });
    });

    // if (!this.editable) {
    this._jsPlumbInstance.bind(INTERCEPT_BEFORE_DROP, (a) => false);
    this._jsPlumbInstance.bind(INTERCEPT_BEFORE_DRAG, (a) => false);
    this._jsPlumbInstance.bind(INTERCEPT_BEFORE_DETACH, (a) => false);
    this._jsPlumbInstance.bind(INTERCEPT_BEFORE_START_DETACH, (a) => false);

    // }

    // this._renderer.setStyle(this.elementRef.nativeElement, 'transform', `scale(${this.zoom})`);
    // this._jsPlumbInstance.setZoom(this.zoom);
  }

  ngAfterViewInit() {
    this.connectionInstances.forEach(ci => {
      const x = this.ngxPlumbService.getEndpoint(this._jsPlumbInstance, ci.source.nodeId, ci.source.endpointId);
      const y = this.ngxPlumbService.getEndpoint(this._jsPlumbInstance, ci.target.nodeId, ci.target.endpointId);
      this._jsPlumbInstance.connect({
        source: x,
        target: y,
      });
    });
  }

  ngOnChanges() {
  }
}
