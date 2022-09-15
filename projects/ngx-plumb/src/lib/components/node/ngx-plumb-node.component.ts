import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, RendererFactory2, SimpleChanges } from '@angular/core';
import { NodeDefinition } from '../../logic/node-definition.class';
import { EVENT_DRAG_START, EVENT_DRAG_STOP, EVENT_DRAG_MOVE, EVENT_ELEMENT_MOUSE_DOWN, EVENT_ELEMENT_CLICK, EVENT_ELEMENT_TAP, EVENT_ELEMENT_MOUSE_UP } from "@jsplumb/browser-ui"
import { EndpointOptions, JsPlumbInstance } from "@jsplumb/core"
import { PointXY } from "@jsplumb/util"
import { NodeInstance } from '../../logic/node-instance.class';
import { NgxPlumbService } from '../../services/ngx-plumb.service';
import { Position } from '../../logic/position.class';
import { Dimension } from '../../logic/dimension.class';

@Component({
  selector: 'ngx-plumb-node',
  templateUrl: './ngx-plumb-node.component.html',
  styleUrls: ['./ngx-plumb-node.component.css'],
  // host: { '[data-jtk-managed]': 'nodeInstance.id' }
})
export class NgxPlumbNodeComponent implements OnInit {

  private _renderer: Renderer2;

  @Input() jsPlumbInstance!: JsPlumbInstance;
  @Input() nodeInstance!: NodeInstance;
  @Input() screenElementRef!: ElementRef;

  // id!: string;

  constructor(private elementRef: ElementRef, private renderFactory: RendererFactory2, private ngxPlumbService: NgxPlumbService) {
    this._renderer = renderFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    if (!this.jsPlumbInstance) throw ('NGX_PLUMB: No jsPlumb.jsPlumbInstance set!');
    if (!this.nodeInstance) throw ('NGX_PLUMB: No NodeInstance set!');
    const nativeElement = this.elementRef.nativeElement;
    const instanceId = this.nodeInstance.id;
    // this.id = instanceId;
    // this.jsPlumbInstance.manage(nativeElement, `XPTO-${instanceId}`);

    // this.renderer.setProperty(nativeElement, "id", instanceId);
    console.log("INIT", nativeElement, instanceId);
  }

  ngAfterViewInit(): void {
    this._updateEndpoints();
  }

  get position(): Position {
    const nativeElement = this.elementRef.nativeElement;
    const parentPoint = this.jsPlumbInstance.getOffset(this.screenElementRef.nativeElement);
    const thisPoint = this.jsPlumbInstance.getOffset(nativeElement);
    const x = thisPoint.x - parentPoint.x;
    const y = thisPoint.y - parentPoint.y;
    return new Position(x, y);
  }

  set position(position: Position) {
    const parentPoint = this.jsPlumbInstance.getOffset(this.screenElementRef.nativeElement);
    const x = parentPoint.x + position.x;
    const y = parentPoint.y + position.y;
    const nativeElement = this.elementRef.nativeElement;
    this.jsPlumbInstance.setPosition(nativeElement, { x: x, y: y });
    // this.renderer.setStyle(nativeElement, 'left', `${x}px`);
    // this.renderer.setStyle(nativeElement, 'top', `${y}px`);
    this.jsPlumbInstance.revalidate(nativeElement);
  }

  set dimension(dimension: Dimension) {
    const nativeElement = this.elementRef.nativeElement;
    const width = dimension.width;
    const height = dimension.height;
    this._renderer.setStyle(nativeElement, 'width', `${width}px`);
    this._renderer.setStyle(nativeElement, 'height', `${height}px`);
    this.jsPlumbInstance.revalidate(nativeElement);
  }

  get ref(): ElementRef {
    return this.elementRef;
  }

  _updateEndpoints(): void {
    const instanceId = this.nodeInstance.id;
    const definition = this.nodeInstance.nodeDefinition;
    const nativeElement = this.elementRef.nativeElement;
    definition.endpointDefinitions.forEach( ed => {
      this.ngxPlumbService.addEndpoint(this.jsPlumbInstance, nativeElement, instanceId, ed.id, ed.anchorId, ed.endpointOptions);
    });
  }

}
