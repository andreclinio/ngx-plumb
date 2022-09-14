import { Component } from '@angular/core';
import { Box } from 'projects/ngx-plumb/src/lib/logic/box.class';
import { ConnectionExtreme, ConnectionInstance } from 'projects/ngx-plumb/src/lib/logic/connection-instance';
import { Dimension } from 'projects/ngx-plumb/src/lib/logic/dimension.class';
import { NodeDefinition } from 'projects/ngx-plumb/src/lib/logic/node-definition.class';
import { NodeInstance } from 'projects/ngx-plumb/src/lib/logic/node-instance.class';
import { Position } from 'projects/ngx-plumb/src/lib/logic/position.class';
import { NgxPlumbService } from 'projects/ngx-plumb/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'simple-example';
  nodeInstances: NodeInstance[] = [];
  connectionInstances: ConnectionInstance[] = [];
  
  constructor() {
  }

  ngOnInit() : void {
    const boxA = new Box(new Position(100, 100), new Dimension(100, 100));
    const boxB = new Box(new Position(200, 200), new Dimension(50, 50));
    const nodeA = new NodeInstance("A", NodeDefinition.NONE, boxA);
    const nodeB = new NodeInstance("B", NodeDefinition.NONE, boxB);
    this.nodeInstances = [nodeA, nodeB];

    this.connectionInstances = [
      new ConnectionInstance(new ConnectionExtreme("A", 'left'), new ConnectionExtreme("B", 'right'))
    ];
  }

  clickedElement(id: string) {
    console.info("App clicked at:", id);
  }
}
