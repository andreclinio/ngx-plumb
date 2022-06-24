import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NodeDefinition } from '../../logic/node-definition.class';
import { EVENT_DRAG_START, EVENT_DRAG_STOP, EVENT_DRAG_MOVE } from "@jsplumb/browser-ui"
import { EndpointOptions, JsPlumbInstance } from "@jsplumb/core"
import { NodeInstance } from '../../logic/node-instance.class';
import { NgxPlumbService } from '../../services/ngx-plumb.service';

@Component({
  selector: 'ngx-plumb-node',
  templateUrl: './ngx-plumb-node.component.html',
  styleUrls: ['./ngx-plumb-node.component.css']
})
export class NgxPlumbNodeComponent implements OnInit {

  source : EndpointOptions= {
    endpoint: 'Dot',
    maxConnections: 0
  };

  @Input() jsPlumbInstance!: JsPlumbInstance;
  @Input() nodeInstance!: NodeInstance;

  constructor(private elementRef: ElementRef, private x: NgxPlumbService) { }

  ngOnInit(): void {
    if (!this.jsPlumbInstance) throw ('NGX_PLUMB: No jsPlumb.jsPlumbInstance set!');
    if (!this.nodeInstance) throw ('NGX_PLUMB: No NodeInstance set!');
  }

  ngAfterViewInit(): void {
    console.info("NGX");

    const instanceId = this.nodeInstance.id; // this.nodeInstance!.id;
    const nativeElement = this.elementRef.nativeElement;
    this.jsPlumbInstance.manage(nativeElement, instanceId);
    // this.x.getJsPlumbInstance().manage(nativeElement, instanceId);
    this.jsPlumbInstance.addEndpoint(
      nativeElement,
      { anchor: 'Right', uuid: instanceId + '-right', maxConnections: 1 }, 
      this.source);

      this.jsPlumbInstance.addEndpoint(
        nativeElement,
        { anchor: 'Left', uuid: instanceId + '-left', maxConnections: 1, }, 
        this.source);
  
    this.jsPlumbInstance.bind(EVENT_DRAG_MOVE, (info) => {
      console.info(`${instanceId} -> ${JSON.stringify(info.pos)}`);
    });
  }

  get ref() : ElementRef {
    return this.elementRef;
  }
}
