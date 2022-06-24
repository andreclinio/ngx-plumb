import { Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { newInstance } from '@jsplumb/browser-ui';
import { JsPlumbInstance } from '@jsplumb/core';
import { Box } from '../../logic/box.class';
import { NodeDefinition } from '../../logic/node-definition.class';
import { NodeInstance } from '../../logic/node-instance.class';
import { NgxPlumbService } from '../../services/ngx-plumb.service';

@Component({
  selector: 'ngx-plumb-screen',
  templateUrl: './ngx-plumb-screen.component.html',
  styleUrls: ['./ngx-plumb-screen.component.css']
})
export class NgxPlumbScreenComponent implements OnInit {

  @Input() nodeInstances: NodeInstance[];

  @ViewChild('nodeInstances', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  
  private _jsPlumbInstance: JsPlumbInstance;

  constructor(private ngxPlumbService: NgxPlumbService, private elementRef: ElementRef) { 
    this.nodeInstances = [ new NodeInstance("A", NodeDefinition.NONE, Box.NONE), new NodeInstance("B", NodeDefinition.NONE, Box.NONE)];
    this._jsPlumbInstance = newInstance({container: this.elementRef.nativeElement});
  }

  ngOnInit(): void {
    if (!this.viewContainerRef) throw ("NGX_PLUMB: No ViewContainerRef");
    this.ngxPlumbService.clear(this.viewContainerRef!);
    this.nodeInstances.forEach( ni => {
      this.ngxPlumbService.addNodeInstance(this._jsPlumbInstance, this.viewContainerRef, ni);
    });
  }

  ngOnChanges() {
  }
}
